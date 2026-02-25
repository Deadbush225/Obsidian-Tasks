import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:home_widget/home_widget.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';

// ─── Entry point ─────────────────────────────────────────────────────────────
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  HomeWidget.setAppGroupId('com.example.gantt_viewer');
  runApp(const GanttApp());
}

// ─── App root ─────────────────────────────────────────────────────────────────
class GanttApp extends StatelessWidget {
  const GanttApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gantt Viewer',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(useMaterial3: true).copyWith(
        colorScheme: ColorScheme.dark(
          primary: const Color(0xFF7C6AF7),
          secondary: const Color(0xFFF7926A),
          surface: const Color(0xFF1E1E2E),
        ),
        scaffoldBackgroundColor: const Color(0xFF181825),
        cardColor: const Color(0xFF1E1E2E),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF1E1E2E),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
      ),
      home: const HomePage(),
    );
  }
}

// ─── Palette (same as Obsidian plugin) ────────────────────────────────────────
const List<Color> kPalette = [
  Color(0xFF7C6AF7), Color(0xFFF7926A), Color(0xFF6BBFF7),
  Color(0xFFF7C86A), Color(0xFF6AF79E), Color(0xFFF76A9E),
  Color(0xFF6AF7F0), Color(0xFFC86AF7), Color(0xFFF7F06A),
  Color(0xFF6A9EF7),
];

// ─── Task model ───────────────────────────────────────────────────────────────
class Task {
  final String id;
  final String title;
  final String status;
  final String priority;
  final String? startDate;
  final String? endDate;
  final String filePath;
  final int colorIdx;

  const Task({
    required this.id,
    required this.title,
    required this.status,
    required this.priority,
    this.startDate,
    this.endDate,
    required this.filePath,
    required this.colorIdx,
  });

  Color get color => kPalette[colorIdx % kPalette.length];

  bool get isOverdue {
    if (endDate == null) return false;
    try {
      final parts = endDate!.split('-');
      final due = DateTime(int.parse(parts[0]), int.parse(parts[1]), int.parse(parts[2]));
      return due.isBefore(DateTime.now()) && status != 'done';
    } catch (_) {
      return false;
    }
  }

  int get daysUntilDue {
    if (endDate == null) return 9999;
    try {
      final parts = endDate!.split('-');
      final due = DateTime(int.parse(parts[0]), int.parse(parts[1]), int.parse(parts[2]));
      return due.difference(DateTime.now()).inDays;
    } catch (_) {
      return 9999;
    }
  }

  Map<String, dynamic> toJson() => {
    'id': id, 'title': title, 'status': status, 'priority': priority,
    'startDate': startDate, 'endDate': endDate, 'colorIdx': colorIdx,
  };
}

// ─── Markdown parser ──────────────────────────────────────────────────────────
Task? parseMarkdownTask(String filePath, String content, int colorIdx) {
  String? frontmatter;
  final fmMatch = RegExp(r'^---\r?\n([\s\S]*?)\r?\n---', multiLine: true).firstMatch(content);
  if (fmMatch != null) frontmatter = fmMatch.group(1);
  if (frontmatter == null) return null;

  String? _field(String key) {
    final m = RegExp(r'^' + key + r'\s*:\s*(.+)$', multiLine: true).firstMatch(frontmatter!);
    return m?.group(1)?.trim().replaceAll(RegExp("^[\"']|[\"']\$"), '');
  }

  final title = _field('title') ?? filePath.split('/').last.replaceAll('.md', '');
  final status = _field('status') ?? 'todo';
  final priority = _field('priority') ?? 'medium';
  final id = _field('id') ?? filePath.split('/').last.replaceAll('.md', '');
  final startDate = _field('startDate') ?? _field('start_date') ?? _field('start');
  final endDate = _field('endDate') ?? _field('end_date') ?? _field('due') ?? _field('end');

  return Task(
    id: id,
    title: title,
    status: status,
    priority: priority,
    startDate: startDate,
    endDate: endDate,
    filePath: filePath,
    colorIdx: colorIdx,
  );
}

// ─── Folder scanner ───────────────────────────────────────────────────────────
Future<List<Task>> scanProjectFolder(String rootPath) async {
  final dir = Directory(rootPath);
  if (!await dir.exists()) return [];
  final tasks = <Task>[];
  int colorIdx = 0;

  Future<void> scanDir(Directory d) async {
    await for (final entry in d.list()) {
      if (entry is! File || !entry.path.endsWith('.md')) continue;
      try {
        final content = await entry.readAsString();
        final task = parseMarkdownTask(entry.path, content, colorIdx);
        if (task != null) {
          tasks.add(task);
          colorIdx++;
        }
      } catch (_) {}
    }
  }

  // Scan root-level .md files
  await scanDir(dir);

  // Scan one level of subdirectories (skip archive)
  await for (final entry in dir.list()) {
    if (entry is! Directory) continue;
    if (entry.path.split('/').last == 'archive') continue;
    await scanDir(entry);
  }

  tasks.sort((a, b) => a.daysUntilDue.compareTo(b.daysUntilDue));
  return tasks;
}

// ─── Home page ────────────────────────────────────────────────────────────────
class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? _projectRoot;
  List<Task> _tasks = [];
  bool _loading = false;
  String _scanInfo = '';

  bool _permissionDenied = false;

  @override
  void initState() {
    super.initState();
    _checkPermissionThenLoad();
  }

  /// Returns true if we have sufficient storage access.
  Future<bool> _hasStoragePermission() async {
    if (await Permission.manageExternalStorage.isGranted) return true;
    if (await Permission.storage.isGranted) return true;
    return false;
  }

  Future<void> _checkPermissionThenLoad() async {
    if (await _hasStoragePermission()) {
      setState(() => _permissionDenied = false);
      _loadSavedRoot();
      return;
    }
    // Try legacy READ_EXTERNAL_STORAGE first (works on Android ≤ 12 without Settings jump)
    final storageStatus = await Permission.storage.request();
    if (storageStatus.isGranted) {
      setState(() => _permissionDenied = false);
      _loadSavedRoot();
      return;
    }
    // On Android 11+ MANAGE_EXTERNAL_STORAGE must be toggled in System Settings
    setState(() => _permissionDenied = true);
  }

  Future<void> _openStorageSettings() async {
    // Opens the exact "All files access" toggle page for this app on Android 11+
    // Falls back to general app settings on older Android
    try {
      await const MethodChannel('com.example.gantt_viewer/widget')
          .invokeMethod('openAllFilesSettings');
    } catch (_) {
      await openAppSettings(); // last-resort fallback
    }
  }

  /// Called by the "I've granted it" button after user returns from Settings
  Future<void> _recheckPermission() async {
    if (await _hasStoragePermission()) {
      setState(() => _permissionDenied = false);
      _loadSavedRoot();
    } else {
      setState(() => _permissionDenied = true);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Storage permission still not granted. '
              'Enable "Allow all files access" for this app in Settings.'),
          duration: Duration(seconds: 4),
        ),
      );
    }
  }

  Future<void> _loadSavedRoot() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString('project_root');
    if (saved != null) {
      setState(() => _projectRoot = saved);
      await _refresh(saved);
    }
  }

  Future<void> _pickFolder() async {
    if (!await _hasStoragePermission()) {
      await _openStorageSettings();
      return;
    }
    final result = await FilePicker.platform.getDirectoryPath(
      dialogTitle: 'Select your Obsidian projects folder',
    );
    if (result == null) return;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('project_root', result);
    setState(() => _projectRoot = result);
    await _refresh(result);
  }

  Future<void> _refresh(String root) async {
    setState(() { _loading = true; _scanInfo = ''; });
    final tasks = await scanProjectFolder(root);
    await _pushToWidget(tasks);
    setState(() {
      _tasks = tasks;
      _loading = false;
      _scanInfo = '${tasks.length} task(s) found';
    });
  }

  Future<void> _pushToWidget(List<Task> tasks) async {
    // Encode top-10 tasks as JSON and store where the widget can read them.
    // home_widget stores to FlutterSharedPreferences with a "flutter." prefix,
    // which matches what GanttWidgetProvider reads.
    final limited = tasks.take(10).map((t) => t.toJson()).toList();
    await HomeWidget.saveWidgetData<String>('tasks_json', jsonEncode(limited));
    await HomeWidget.updateWidget(androidName: 'GanttWidgetProvider');
    // Also trigger via MethodChannel so the widget refreshes immediately
    // even when home_widget's broadcast hasn't fired yet.
    try {
      await const MethodChannel('com.example.gantt_viewer/widget')
          .invokeMethod('updateWidget');
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gantt Viewer', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(Icons.folder_open),
            tooltip: 'Change projects folder',
            onPressed: _pickFolder,
          ),
          if (_projectRoot != null)
            IconButton(
              icon: const Icon(Icons.refresh),
              tooltip: 'Refresh',
              onPressed: () => _refresh(_projectRoot!),
            ),
        ],
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    // ── Permission gate ───────────────────────────────────────────────────────
    if (_permissionDenied) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.lock, size: 72, color: Color(0xFFF7926A)),
              const SizedBox(height: 20),
              const Text('Storage permission required',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),
              const Text(
                'On Android 11 and above, this app needs "All Files Access" to read your Obsidian vault.\n\n'
                '1. Tap "Open Settings" below\n'
                '2. Find this app and enable "Allow all files access"\n'
                '3. Return here and tap "I\'ve granted it"',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white70, height: 1.6),
              ),
              const SizedBox(height: 28),
              FilledButton.icon(
                onPressed: _openStorageSettings,
                icon: const Icon(Icons.settings),
                label: const Text('Open Settings'),
              ),
              const SizedBox(height: 12),
              OutlinedButton.icon(
                onPressed: _recheckPermission,
                icon: const Icon(Icons.check_circle_outline),
                label: const Text("I've granted it"),
              ),
            ],
          ),
        ),
      );
    }

    if (_projectRoot == null) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.folder_open, size: 72, color: Color(0xFF7C6AF7)),
            const SizedBox(height: 20),
            const Text('No projects folder selected',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            const Text('Tap the button below to choose your Obsidian projects folder',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white54)),
            const SizedBox(height: 28),
            FilledButton.icon(
              onPressed: _pickFolder,
              icon: const Icon(Icons.folder_open),
              label: const Text('Select folder'),
            ),
          ],
        ),
      );
    }

    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }

    // ── Real task list ────────────────────────────────────────────────────────
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _FolderBanner(path: _projectRoot!),
        if (_scanInfo.isNotEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
            child: Text(_scanInfo,
                style: const TextStyle(fontSize: 11, color: Color(0xFF7C6AF7))),
          ),
        Expanded(
          child: RefreshIndicator(
            onRefresh: () => _refresh(_projectRoot!),
            child: _tasks.isEmpty
                ? const Center(
                    child: Text(
                      'No tasks found\n\nMake sure your markdown files have\n---\ntitle: ...\nstatus: ...\n---\nfrontmatter.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.white38, height: 1.6),
                    ))
                : ListView.builder(
                    padding: const EdgeInsets.all(10),
                    itemCount: _tasks.length,
                    itemBuilder: (_, i) => _TaskCard(task: _tasks[i]),
                  ),
          ),
        ),
      ],
    );
  }
}

// ─── Folder banner ────────────────────────────────────────────────────────────
class _FolderBanner extends StatelessWidget {
  final String path;
  const _FolderBanner({required this.path});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      color: const Color(0xFF13131F),
      child: Row(
        children: [
          const Icon(Icons.folder, color: Color(0xFF7C6AF7), size: 16),
          const SizedBox(width: 6),
          Expanded(
            child: Text(path,
                style: const TextStyle(fontSize: 11, color: Colors.white38),
                overflow: TextOverflow.ellipsis),
          ),
        ],
      ),
    );
  }
}

// ─── Task card ────────────────────────────────────────────────────────────────
class _TaskCard extends StatelessWidget {
  final Task task;
  const _TaskCard({required this.task});

  @override
  Widget build(BuildContext context) {
    final overdue = task.isOverdue;
    final days = task.daysUntilDue;

    String dueBadge = '';
    Color dueColor = Colors.white54;
    if (task.endDate != null) {
      if (overdue) {
        dueBadge = 'Overdue ${(-days).abs()}d';
        dueColor = const Color(0xFFE84040);
      } else if (days == 0) {
        dueBadge = 'Due today';
        dueColor = const Color(0xFFFFCD5E);
      } else if (days <= 3) {
        dueBadge = 'Due in ${days}d';
        dueColor = const Color(0xFFF7926A);
      } else {
        dueBadge = '🗓 ${task.endDate}';
        dueColor = Colors.white38;
      }
    }

    final statusColor = {
      'todo': Colors.white38,
      'in-progress': const Color(0xFFFFCD5E),
      'blocked': const Color(0xFFE84040),
      'done': const Color(0xFF4CAF50),
    }[task.status] ?? Colors.white38;

    final priorityColor = {
      'low': const Color(0xFF6BB6FF),
      'medium': const Color(0xFFFFCD5E),
      'high': const Color(0xFFF7926A),
      'critical': const Color(0xFFE84040),
    }[task.priority] ?? Colors.white38;

    return Card(
      margin: const EdgeInsets.symmetric(vertical: 5),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Accent bar
            Container(
              width: 4,
              decoration: BoxDecoration(
                color: task.color,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(10),
                  bottomLeft: Radius.circular(10),
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(task.title,
                              style: const TextStyle(
                                  fontWeight: FontWeight.w600, fontSize: 15)),
                        ),
                        _Badge(label: task.priority.toUpperCase(), color: priorityColor),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        _StatusChip(status: task.status, color: statusColor),
                        const SizedBox(width: 8),
                        if (task.endDate != null)
                          Text(dueBadge,
                              style: TextStyle(fontSize: 12, color: dueColor,
                                  fontWeight: overdue || days <= 3
                                      ? FontWeight.bold : FontWeight.normal)),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  final String label;
  final Color color;
  const _Badge({required this.label, required this.color});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: color.withAlpha(40),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: color.withAlpha(100)),
      ),
      child: Text(label, style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.bold)),
    );
  }
}

class _StatusChip extends StatelessWidget {
  final String status;
  final Color color;
  const _StatusChip({required this.status, required this.color});
  @override
  Widget build(BuildContext context) {
    final labels = {
      'todo': '📋 To Do',
      'in-progress': '🔄 In Progress',
      'blocked': '🚫 Blocked',
      'done': '✅ Done',
    };
    return Text(labels[status] ?? status,
        style: TextStyle(fontSize: 12, color: color));
  }
}


class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // TRY THIS: Try changing the color here to a specific color (to
        // Colors.amber, perhaps?) and trigger a hot reload to see the AppBar
        // change color while the other colors stay the same.
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          //
          // TRY THIS: Invoke "debug painting" (choose the "Toggle Debug Paint"
          // action in the IDE, or press "p" in the console), to see the
          // wireframe for each widget.
          mainAxisAlignment: .center,
          children: [
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
