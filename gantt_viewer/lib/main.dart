import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:home_widget/home_widget.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'sync_service.dart';

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

// ─── Palette ─────────────────────────────────────────────────────────────────
const List<Color> kPalette = [
  Color(0xFF7C6AF7), Color(0xFFF7926A), Color(0xFF6BBFF7),
  Color(0xFFF7C86A), Color(0xFF6AF79E), Color(0xFFF76A9E),
  Color(0xFF6AF7F0), Color(0xFFC86AF7), Color(0xFFF7F06A),
  Color(0xFF6A9EF7),
];

const List<String> kStatuses   = ['todo', 'in-progress', 'blocked', 'done'];
const List<String> kPriorities = ['low', 'medium', 'high', 'critical'];

// ─── Helpers ─────────────────────────────────────────────────────────────────
String _fmtDate(DateTime d) =>
    '${d.year}-${d.month.toString().padLeft(2,'0')}-${d.day.toString().padLeft(2,'0')}';

DateTime? _parseDate(String? s) {
  if (s == null || s.isEmpty) return null;
  try {
    final p = s.split('-');
    return DateTime(int.parse(p[0]), int.parse(p[1]), int.parse(p[2]));
  } catch (_) { return null; }
}

/// Returns today's date with time zeroed out — used for due-date comparisons
/// so that a task due today is never treated as overdue.
DateTime _today() {
  final n = DateTime.now();
  return DateTime(n.year, n.month, n.day);
}

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
  /// Unix milliseconds — used for conflict resolution (last-write-wins).
  final int updatedAt;

  const Task({
    required this.id,
    required this.title,
    required this.status,
    required this.priority,
    this.startDate,
    this.endDate,
    required this.filePath,
    required this.colorIdx,
    this.updatedAt = 0,
  });

  Task copyWith({
    String? title, String? status, String? priority,
    String? startDate, String? endDate,
    bool clearStartDate = false, bool clearEndDate = false,
    int? updatedAt,
  }) => Task(
    id: id,
    title: title ?? this.title,
    status: status ?? this.status,
    priority: priority ?? this.priority,
    startDate: clearStartDate ? null : (startDate ?? this.startDate),
    endDate: clearEndDate ? null : (endDate ?? this.endDate),
    filePath: filePath,
    colorIdx: colorIdx,
    updatedAt: updatedAt ?? this.updatedAt,
  );

  Color get color => kPalette[colorIdx % kPalette.length];

  bool get isOverdue {
    final due = _parseDate(endDate);
    if (due == null) return false;
    final today = _today();
    return due.isBefore(today) && status != 'done';
  }

  int get daysUntilDue {
    final due = _parseDate(endDate);
    if (due == null) return 9999;
    return due.difference(_today()).inDays;
  }

  Map<String, dynamic> toJson() => {
    'id': id, 'title': title, 'status': status, 'priority': priority,
    'startDate': startDate, 'endDate': endDate, 'colorIdx': colorIdx,
    'updatedAt': updatedAt,
  };
}

// ─── File I/O helpers ─────────────────────────────────────────────────────────

/// Generate a short random alphanumeric ID (12 chars), similar to nanoid.
String _nanoid([int len = 12]) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  final rand = StringBuffer();
  for (var i = 0; i < len; i++) {
    rand.write(chars[(DateTime.now().microsecondsSinceEpoch + i * 7919) % chars.length]);
  }
  return rand.toString();
}

/// Build a YAML frontmatter markdown file for a new task.
String _buildFrontmatter({
  required String id,
  required String title,
  required String status,
  required String priority,
  String? startDate,
  String? endDate,
  int? updatedAt,
}) {
  final ts = updatedAt ?? DateTime.now().millisecondsSinceEpoch;
  return '''---
id: $id
title: $title
status: $status
priority: $priority
startDate: ${startDate ?? ''}
endDate: ${endDate ?? ''}
updated_at: $ts
---

# $title

## Description

## Notes
''';
}

/// Rewrite a single frontmatter field in a markdown file on disk.
/// Always bumps `updated_at` to the current time so the file's timestamp
/// is fresh and conflict resolution works correctly on next push.
Future<void> _writeTaskField(String filePath, Map<String, String?> fields) async {
  final file = File(filePath);
  if (!await file.exists()) return;
  var content = await file.readAsString();

  // Always stamp updated_at with current time when any field changes
  final allFields = {
    ...fields,
    'updated_at': DateTime.now().millisecondsSinceEpoch.toString(),
  };

  for (final entry in allFields.entries) {
    final key = entry.key;
    final val = entry.value;
    final lineRx = RegExp('^$key\\s*:.*\$', multiLine: true);
    if (val == null || val.isEmpty) {
      content = content.replaceAll(lineRx, '');
    } else if (lineRx.hasMatch(content)) {
      content = content.replaceAll(lineRx, '$key: $val');
    } else {
      // Insert before closing ---
      content = content.replaceFirst(RegExp(r'\n---'), '\n$key: $val\n---');
    }
  }
  // Remove consecutive blank lines that might appear after deletion
  content = content.replaceAll(RegExp(r'\n{3,}'), '\n\n');
  await file.writeAsString(content);
}

/// Move a file into <root>/archive/, timestamping on collision.
Future<void> _archiveFile(String filePath, String projectRoot) async {
  final file = File(filePath);
  if (!await file.exists()) return;
  final archiveDir = Directory('$projectRoot/archive');
  if (!await archiveDir.exists()) await archiveDir.create(recursive: true);
  final name = filePath.split('/').last;
  var dest = '${archiveDir.path}/$name';
  if (await File(dest).exists()) {
    dest = '${archiveDir.path}/${name.replaceAll('.md', '')}-${DateTime.now().millisecondsSinceEpoch}.md';
  }
  await file.rename(dest);
}

// ─── Markdown parser ──────────────────────────────────────────────────────────
Task? parseMarkdownTask(String filePath, String content, int colorIdx) {
  final fmMatch = RegExp(r'^---\r?\n([\s\S]*?)\r?\n---', multiLine: true).firstMatch(content);
  if (fmMatch == null) return null;
  final fm = fmMatch.group(1)!;

  String? field(String key) {
    final m = RegExp('^$key\\s*:\\s*(.+)\$', multiLine: true).firstMatch(fm);
    return m?.group(1)?.trim().replaceAll(RegExp("^[\"']|[\"']\$"), '');
  }

  return Task(
    id:        field('id') ?? filePath.split('/').last.replaceAll('.md', ''),
    title:     field('title') ?? filePath.split('/').last.replaceAll('.md', ''),
    status:    field('status') ?? 'todo',
    priority:  field('priority') ?? 'medium',
    startDate: field('startDate') ?? field('start_date') ?? field('start'),
    endDate:   field('endDate') ?? field('end_date') ?? field('due') ?? field('end'),
    filePath:  filePath,
    colorIdx:  colorIdx,
    updatedAt: int.tryParse(field('updated_at') ?? '') ?? 0,
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
        final task = parseMarkdownTask(entry.path, await entry.readAsString(), colorIdx);
        if (task != null) { tasks.add(task); colorIdx++; }
      } catch (_) {}
    }
  }

  await scanDir(dir);
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

class _HomePageState extends State<HomePage> with SingleTickerProviderStateMixin {
  String? _projectRoot;
  List<Task> _tasks = [];
  bool _loading = false;
  String _scanInfo = '';
  bool _permissionDenied = false;
  late final TabController _tabs;

  // Sync state
  _SyncStatus _syncStatus = _SyncStatus.idle;
  String _syncInfo = '';

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 3, vsync: this);
    _checkPermissionThenLoad();
  }

  @override
  void dispose() { _tabs.dispose(); super.dispose(); }

  Future<bool> _hasStoragePermission() async {
    if (await Permission.manageExternalStorage.isGranted) return true;
    if (await Permission.storage.isGranted) return true;
    return false;
  }

  Future<void> _checkPermissionThenLoad() async {
    if (await _hasStoragePermission()) { setState(() => _permissionDenied = false); _loadSavedRoot(); return; }
    final s = await Permission.storage.request();
    if (s.isGranted) { setState(() => _permissionDenied = false); _loadSavedRoot(); return; }
    setState(() => _permissionDenied = true);
  }

  Future<void> _openStorageSettings() async {
    try {
      await const MethodChannel('com.example.gantt_viewer/widget').invokeMethod('openAllFilesSettings');
    } catch (_) { await openAppSettings(); }
  }

  Future<void> _recheckPermission() async {
    if (await _hasStoragePermission()) {
      setState(() => _permissionDenied = false);
      _loadSavedRoot();
    } else {
      setState(() => _permissionDenied = true);
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text('Still no permission. Enable "Allow all files access" in Settings.'),
      ));
    }
  }

  Future<void> _loadSavedRoot() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString('project_root');
    if (saved != null) { setState(() => _projectRoot = saved); await _refresh(saved); }
  }

  Future<void> _pickFolder() async {
    if (!await _hasStoragePermission()) { await _openStorageSettings(); return; }
    final result = await FilePicker.platform.getDirectoryPath(dialogTitle: 'Select Obsidian projects folder');
    if (result == null) return;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('project_root', result);
    setState(() => _projectRoot = result);
    await _refresh(result);
  }

  Future<void> _refresh([String? root]) async {
    final r = root ?? _projectRoot;
    if (r == null) return;
    setState(() { _loading = true; _scanInfo = ''; });
    final tasks = await scanProjectFolder(r);
    await _pushToWidget(tasks);
    setState(() { _tasks = tasks; _loading = false; _scanInfo = '${tasks.length} task(s)'; });
  }

  Future<void> _pushToWidget(List<Task> tasks) async {
    final limited = tasks.take(10).map((t) => t.toJson()).toList();
    await HomeWidget.saveWidgetData<String>('tasks_json', jsonEncode(limited));
    await HomeWidget.updateWidget(androidName: 'GanttWidgetProvider');
    try { await const MethodChannel('com.example.gantt_viewer/widget').invokeMethod('updateWidget'); } catch (_) {}
  }

  // ── Cloud sync ──────────────────────────────────────────────────────────────

  Future<void> _syncToCloud() async {
    if (!await SyncService.isConfigured) return;
    setState(() { _syncStatus = _SyncStatus.syncing; _syncInfo = ''; });

    final payload = _tasks.map((t) => {
      ...t.toJson(),
      // Use the real updatedAt from the file; fall back to now only if missing
      'updatedAt': t.updatedAt > 0 ? t.updatedAt : DateTime.now().millisecondsSinceEpoch,
    }).toList();

    final result = await SyncService.sync(payload);

    if (!mounted) return;
    if (!result.ok) {
      setState(() { _syncStatus = _SyncStatus.error; _syncInfo = result.error!; });
      return;
    }

    // Apply pulled tasks (server is authoritative for these)
    if (result.pulledTasks.isNotEmpty || result.archivedIds.isNotEmpty) {
      await _applyPulledTasks(result.pulledTasks, result.archivedIds);
    }

    // Refresh local state after applying remote changes
    await _refresh();

    if (!mounted) return;
    setState(() {
      _syncStatus = _SyncStatus.ok;
      _syncInfo = '↑${result.pushed} ↓${result.pulled}';
    });

    if (result.hasConflicts) _showConflictDialog(result.conflicts);
  }

  /// Write server-side tasks to local .md files and delete archived ones.
  /// For each pulled task, if a matching local file exists and server is newer,
  /// update it; otherwise create a new file in the project root.
  Future<void> _applyPulledTasks(
    List<Map<String, dynamic>> pulled,
    List<String> archivedIds,
  ) async {
    if (_projectRoot == null) return;

    // Build id → filePath map from current local tasks
    final localById = { for (final t in _tasks) t.id: t };

    // Delete archived tasks
    for (final id in archivedIds) {
      final local = localById[id];
      if (local != null) {
        final f = File(local.filePath);
        if (await f.exists()) await f.delete();
      }
    }

    // Write / update pulled tasks
    for (final rt in pulled) {
      final id           = rt['id'] as String? ?? '';
      final serverTs     = (rt['updatedAt'] as int?) ?? 0;
      final title        = rt['title'] as String? ?? id;
      final status       = rt['status'] as String? ?? 'todo';
      final priority     = rt['priority'] as String? ?? 'medium';
      final startDate    = rt['startDate'] as String?;
      final endDate      = rt['endDate'] as String?;

      final local = localById[id];

      if (local != null) {
        // Only overwrite if server is strictly newer
        if (serverTs <= local.updatedAt) continue;
        await _writeTaskField(local.filePath, {
          'title':      title,
          'status':     status,
          'priority':   priority,
          'startDate':  startDate ?? '',
          'endDate':    endDate ?? '',
          'updated_at': serverTs.toString(),
        });
      } else {
        // New task from server — create a local file
        final safeName = title.replaceAll(RegExp(r'[\\/:*?"<>|]'), '-');
        final filePath = '$_projectRoot/$safeName.md';
        final content  = _buildFrontmatter(
          id: id, title: title, status: status, priority: priority,
          startDate: startDate, endDate: endDate,
          updatedAt: serverTs,
        );
        await File(filePath).writeAsString(content);
      }
    }
  }

  void _showConflictDialog(List<SyncConflict> conflicts) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: const Color(0xFF1E1E2E),
        title: Row(children: [
          const Icon(Icons.sync_problem, color: Color(0xFFF7926A)),
          const SizedBox(width: 8),
          Text('${conflicts.length} sync conflict${conflicts.length > 1 ? 's' : ''}'),
        ]),
        content: SizedBox(
          width: double.maxFinite,
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('The server has newer versions of these tasks. '
                'Accept server versions?',
                style: TextStyle(color: Colors.white70)),
            const SizedBox(height: 12),
            ...conflicts.map((c) => Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Row(children: [
                const Icon(Icons.circle, size: 6, color: Color(0xFFF7926A)),
                const SizedBox(width: 8),
                Expanded(child: Text(c.serverTask['title'] ?? c.serverTask['id'] ?? '?',
                    style: const TextStyle(fontSize: 13))),
              ]),
            )),
          ]),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              // Force-push local versions so the server (and other clients) adopt ours
              _keepMineConflicts(conflicts);
            },
            child: const Text('Keep mine'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: const Color(0xFF7C6AF7)),
            onPressed: () {
              Navigator.pop(context);
              // Apply server versions to local markdown files
              _applyServerConflicts(conflicts);
            },
            child: const Text('Accept server'),
          ),
        ],
      ),
    );
  }

  Future<void> _applyServerConflicts(List<SyncConflict> conflicts) async {
    for (final c in conflicts) {
      // Find matching local task by id
      final local = _tasks.where((t) => t.id == c.serverTask['id']).firstOrNull;
      if (local == null) continue;
      // Write server fields AND stamp the server's updatedAt so future pushes
      // carry the correct timestamp and won't get overwritten again.
      final serverTs = (c.serverTask['updatedAt'] as int?)?.toString()
          ?? DateTime.now().millisecondsSinceEpoch.toString();
      await _writeTaskField(local.filePath, {
        'title':      c.serverTask['title'] as String? ?? local.title,
        'status':     c.serverTask['status'] as String? ?? local.status,
        'priority':   c.serverTask['priority'] as String? ?? local.priority,
        'startDate':  (c.serverTask['startDate'] as String?) ?? local.startDate ?? '',
        'endDate':    (c.serverTask['endDate'] as String?) ?? local.endDate ?? '',
        'updated_at': serverTs,
      });
    }
    await _refresh();
  }

  /// Force-push local versions of conflicting tasks so the server (and all
  /// other clients like the Obsidian plugin) adopt the Flutter user's version.
  ///
  /// Strategy: bump each task's `updated_at` to `serverTs + 1` so it is
  /// strictly newer than the server copy, guaranteeing the push wins.
  Future<void> _keepMineConflicts(List<SyncConflict> conflicts) async {
    if (!await SyncService.isConfigured) return;

    for (final c in conflicts) {
      final local = _tasks.where((t) => t.id == c.serverTask['id']).firstOrNull;
      if (local == null) continue;

      // Use serverTs + 1 so our timestamp beats the server's current value
      final serverTs    = (c.serverTask['updatedAt'] as int?) ?? 0;
      final winningTs   = serverTs + 1;

      // Persist the winning timestamp to the local file
      await _writeTaskField(local.filePath, {
        'updated_at': winningTs.toString(),
      });

      // Force-push with the winning timestamp — server will overwrite its copy
      await SyncService.pushOne({
        ...local.toJson(),
        'updatedAt': winningTs,
      });
    }

    await _refresh();
  }

  void _openSyncSetup() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF1E1E2E),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => _SyncSetupSheet(
        onSaved: () { Navigator.pop(context); _syncToCloud(); },
      ),
    );
  }

  /// Persist changes to the markdown file and reload task in state.
  Future<void> _saveTask(Task updated) async {
    final now = DateTime.now().millisecondsSinceEpoch;
    await _writeTaskField(updated.filePath, {
      'title':      updated.title,
      'status':     updated.status,
      'priority':   updated.priority,
      'startDate':  updated.startDate ?? '',
      'endDate':    updated.endDate ?? '',
      'updated_at': now.toString(),   // explicit ts so file and push stay in sync
    });
    await _refresh();
    // Push the single changed task immediately if sync is configured
    if (await SyncService.isConfigured) {
      SyncService.pushOne({
        ...updated.toJson(),
        'updatedAt': now,
      });
    }
  }

  Future<void> _archiveTask(Task t) async {
    if (_projectRoot == null) return;
    await _archiveFile(t.filePath, _projectRoot!);
    await _refresh();
    if (await SyncService.isConfigured) {
      SyncService.archiveRemote(t.id);
    }
  }

  void _openTaskSheet(Task t) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF1E1E2E),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => _TaskEditSheet(
        task: t,
        onSave: (updated) { Navigator.pop(context); _saveTask(updated); },
        onArchive: () { Navigator.pop(context); _archiveTask(t); },
      ),
    );
  }

  /// Create a brand-new markdown task file in the project root.
  Future<void> _createTask({
    required String title,
    required String status,
    required String priority,
    String? startDate,
    String? endDate,
  }) async {
    if (_projectRoot == null) return;
    final id       = _nanoid();
    final safeName = title.replaceAll(RegExp(r'[\\/:*?"<>|]'), '-');
    final filePath = '$_projectRoot/$safeName.md';
    final now      = DateTime.now().millisecondsSinceEpoch;
    final content  = _buildFrontmatter(
      id: id, title: title, status: status, priority: priority,
      startDate: startDate, endDate: endDate,
      updatedAt: now,
    );
    await File(filePath).writeAsString(content);
    await _refresh();
    if (await SyncService.isConfigured) {
      SyncService.pushOne({
        'id': id, 'title': title, 'status': status, 'priority': priority,
        'startDate': startDate, 'endDate': endDate,
        'rawFrontmatter': content,
        'updatedAt': now,
      });
    }
  }

  void _openNewTaskSheet() {
    if (_projectRoot == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Select a project folder first')),
      );
      return;
    }
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF1E1E2E),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => _NewTaskSheet(
        onCreate: (title, status, priority, start, end) {
          Navigator.pop(context);
          _createTask(
            title: title, status: status, priority: priority,
            startDate: start, endDate: end,
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final showTabs = _projectRoot != null && !_permissionDenied;
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 48,
        titleSpacing: 12,
        title: showTabs
            ? Row(children: [
                const Text('Gantt Viewer', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(width: 12),
                Expanded(
                  child: TabBar(
                    controller: _tabs,
                    indicatorColor: const Color(0xFF7C6AF7),
                    labelColor: const Color(0xFF7C6AF7),
                    unselectedLabelColor: Colors.white38,
                    indicatorSize: TabBarIndicatorSize.label,
                    labelPadding: EdgeInsets.zero,
                    tabs: const [
                      Tab(icon: Icon(Icons.list, size: 18), height: 36),
                      Tab(icon: Icon(Icons.view_column, size: 18), height: 36),
                      Tab(icon: Icon(Icons.bar_chart, size: 18), height: 36),
                    ],
                  ),
                ),
              ])
            : const Text('Gantt Viewer', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        actions: [
          IconButton(
            icon: const Icon(Icons.folder_open, size: 20),
            tooltip: 'Change folder',
            onPressed: _pickFolder,
            visualDensity: VisualDensity.compact,
          ),
          if (_projectRoot != null)
            IconButton(
              icon: const Icon(Icons.refresh, size: 20),
              tooltip: 'Refresh',
              onPressed: () => _refresh(),
              visualDensity: VisualDensity.compact,
            ),
          // Sync button — shows status icon + opens setup if not configured
          _SyncButton(
            status: _syncStatus,
            info: _syncInfo,
            onTap: () async {
              if (await SyncService.isConfigured) {
                _syncToCloud();
              } else {
                _openSyncSetup();
              }
            },
            onLongPress: _openSyncSetup,
          ),
        ],
      ),
      body: _buildBody(),
      floatingActionButton: _projectRoot != null && !_permissionDenied
          ? FloatingActionButton(
              onPressed: _openNewTaskSheet,
              backgroundColor: const Color(0xFF7C6AF7),
              tooltip: 'New task',
              child: const Icon(Icons.add),
            )
          : null,
    );
  }

  Widget _buildBody() {
    if (_permissionDenied) return _PermissionGate(onOpenSettings: _openStorageSettings, onRecheck: _recheckPermission);
    if (_projectRoot == null) return _FolderPicker(onPick: _pickFolder);
    if (_loading) return const Center(child: CircularProgressIndicator());

    final body = TabBarView(
      controller: _tabs,
      children: [
        _ListView(tasks: _tasks, projectRoot: _projectRoot!, scanInfo: _scanInfo, onTap: _openTaskSheet, onRefresh: _refresh),
        _KanbanView(tasks: _tasks, onTap: _openTaskSheet),
        _GanttView(tasks: _tasks, onTap: _openTaskSheet),
      ],
    );
    return body;
  }
}

// ─── Permission gate ──────────────────────────────────────────────────────────
class _PermissionGate extends StatelessWidget {
  final VoidCallback onOpenSettings, onRecheck;
  const _PermissionGate({required this.onOpenSettings, required this.onRecheck});
  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.all(32),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        const Icon(Icons.lock, size: 72, color: Color(0xFFF7926A)),
        const SizedBox(height: 20),
        const Text('Storage permission required', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        const Text(
          'On Android 11+, this app needs "All Files Access" to read your Obsidian vault.\n\n'
          '1. Tap "Open Settings"\n2. Enable "Allow all files access"\n3. Return and tap "I\'ve granted it"',
          textAlign: TextAlign.center, style: TextStyle(color: Colors.white70, height: 1.6)),
        const SizedBox(height: 28),
        FilledButton.icon(onPressed: onOpenSettings, icon: const Icon(Icons.settings), label: const Text('Open Settings')),
        const SizedBox(height: 12),
        OutlinedButton.icon(onPressed: onRecheck, icon: const Icon(Icons.check_circle_outline), label: const Text("I've granted it")),
      ]),
    ),
  );
}

// ─── Folder picker splash ─────────────────────────────────────────────────────
class _FolderPicker extends StatelessWidget {
  final VoidCallback onPick;
  const _FolderPicker({required this.onPick});
  @override
  Widget build(BuildContext context) => Center(
    child: Column(mainAxisSize: MainAxisSize.min, children: [
      const Icon(Icons.folder_open, size: 72, color: Color(0xFF7C6AF7)),
      const SizedBox(height: 20),
      const Text('No folder selected', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
      const SizedBox(height: 8),
      const Text('Choose your Obsidian projects folder', style: TextStyle(color: Colors.white54)),
      const SizedBox(height: 28),
      FilledButton.icon(onPressed: onPick, icon: const Icon(Icons.folder_open), label: const Text('Select folder')),
    ]),
  );
}

// ─── Folder banner ────────────────────────────────────────────────────────────
class _FolderBanner extends StatelessWidget {
  final String path;
  final String info;
  const _FolderBanner({required this.path, this.info = ''});
  @override
  Widget build(BuildContext context) => Container(
    width: double.infinity,
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
    color: const Color(0xFF13131F),
    child: Row(children: [
      const Icon(Icons.folder, color: Color(0xFF7C6AF7), size: 14),
      const SizedBox(width: 6),
      Expanded(child: Text(path, style: const TextStyle(fontSize: 11, color: Colors.white38), overflow: TextOverflow.ellipsis)),
      if (info.isNotEmpty) Text(info, style: const TextStyle(fontSize: 11, color: Color(0xFF7C6AF7))),
    ]),
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ─── LIST VIEW ───────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
class _ListView extends StatelessWidget {
  final List<Task> tasks;
  final String projectRoot, scanInfo;
  final void Function(Task) onTap;
  final Future<void> Function() onRefresh;
  const _ListView({required this.tasks, required this.projectRoot, required this.scanInfo, required this.onTap, required this.onRefresh});

  @override
  Widget build(BuildContext context) => Column(children: [
    _FolderBanner(path: projectRoot, info: scanInfo),
    Expanded(
      child: RefreshIndicator(
        onRefresh: onRefresh,
        child: tasks.isEmpty
          ? const Center(child: Text('No tasks found\n\nFiles need --- frontmatter ---', textAlign: TextAlign.center, style: TextStyle(color: Colors.white38, height: 1.6)))
          : ListView.builder(
              padding: const EdgeInsets.all(10),
              itemCount: tasks.length,
              itemBuilder: (_, i) => _TaskCard(task: tasks[i], onTap: onTap)),
      ),
    ),
  ]);
}

// ══════════════════════════════════════════════════════════════════════════════
// ─── KANBAN VIEW ─────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
class _KanbanView extends StatelessWidget {
  final List<Task> tasks;
  final void Function(Task) onTap;
  const _KanbanView({required this.tasks, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final cols = {for (final s in kStatuses) s: tasks.where((t) => t.status == s).toList()};
    final labels = {'todo': '📋 To Do', 'in-progress': '🔄 In Progress', 'blocked': '🚫 Blocked', 'done': '✅ Done'};
    final colors = {
      'todo': Colors.white38, 'in-progress': const Color(0xFFFFCD5E),
      'blocked': const Color(0xFFE84040), 'done': const Color(0xFF4CAF50),
    };

    return ListView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.all(12),
      children: kStatuses.map((s) {
        final col = cols[s]!;
        return Container(
          width: 240,
          margin: const EdgeInsets.only(right: 12),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Row(children: [
                Text(labels[s]!, style: TextStyle(fontWeight: FontWeight.bold, color: colors[s])),
                const SizedBox(width: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                  decoration: BoxDecoration(color: colors[s]!.withAlpha(40), borderRadius: BorderRadius.circular(10)),
                  child: Text('${col.length}', style: TextStyle(fontSize: 11, color: colors[s])),
                ),
              ]),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: col.length,
                itemBuilder: (_, i) => _KanbanCard(task: col[i], onTap: onTap),
              ),
            ),
          ]),
        );
      }).toList(),
    );
  }
}

class _KanbanCard extends StatelessWidget {
  final Task task;
  final void Function(Task) onTap;
  const _KanbanCard({required this.task, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final priorityColor = {
      'low': const Color(0xFF6BB6FF), 'medium': const Color(0xFFFFCD5E),
      'high': const Color(0xFFF7926A), 'critical': const Color(0xFFE84040),
    }[task.priority] ?? Colors.white38;

    return GestureDetector(
      onTap: () => onTap(task),
      child: Card(
        margin: const EdgeInsets.only(bottom: 8),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Container(width: 8, height: 8, decoration: BoxDecoration(color: task.color, shape: BoxShape.circle)),
              const SizedBox(width: 6),
              Expanded(child: Text(task.title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13))),
              _Badge(label: task.priority.toUpperCase(), color: priorityColor),
            ]),
            if (task.endDate != null) ...[
              const SizedBox(height: 6),
              _DueBadge(task: task),
            ],
          ]),
        ),
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// ─── GANTT VIEW ──────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
class _GanttView extends StatefulWidget {
  final List<Task> tasks;
  final void Function(Task) onTap;
  const _GanttView({required this.tasks, required this.onTap});
  @override
  State<_GanttView> createState() => _GanttViewState();
}

class _GanttViewState extends State<_GanttView> {
  static const double kDayW = 28.0;
  static const double kRowH = 40.0;
  static const double kLabelW = 160.0;
  static const double kHeaderH = 56.0;

  final _scrollCtrl = ScrollController();

  late DateTime _start;
  late DateTime _end;
  late int _days;

  @override
  void initState() {
    super.initState();
    _computeRange();
    WidgetsBinding.instance.addPostFrameCallback((_) => _scrollToToday());
  }

  @override
  void didUpdateWidget(_GanttView old) {
    super.didUpdateWidget(old);
    _computeRange();
  }

  void _computeRange() {
    final now = DateTime.now();
    DateTime earliest = now.subtract(const Duration(days: 14));
    DateTime latest   = now.add(const Duration(days: 60));
    for (final t in widget.tasks) {
      final s = _parseDate(t.startDate);
      final e = _parseDate(t.endDate);
      if (s != null && s.isBefore(earliest)) earliest = s.subtract(const Duration(days: 3));
      if (e != null && e.isAfter(latest))    latest   = e.add(const Duration(days: 3));
    }
    _start = DateTime(earliest.year, earliest.month, earliest.day);
    _end   = DateTime(latest.year, latest.month, latest.day);
    _days  = _end.difference(_start).inDays + 1;
  }

  void _scrollToToday() {
    final offset = DateTime.now().difference(_start).inDays * kDayW - 80.0;
    if (_scrollCtrl.hasClients) _scrollCtrl.jumpTo(offset.clamp(0, _scrollCtrl.position.maxScrollExtent));
  }

  @override
  Widget build(BuildContext context) {
    if (widget.tasks.isEmpty) {
      return const Center(child: Text('No tasks to display', style: TextStyle(color: Colors.white38)));
    }

    // Build month header spans
    final months = <({String label, int span})>[];
    DateTime cursor = _start;
    while (!cursor.isAfter(_end)) {
      final label = _monthLabel(cursor);
      int span = 0;
      while (!cursor.isAfter(_end) && _monthLabel(cursor) == label) { span++; cursor = cursor.add(const Duration(days: 1)); }
      months.add((label: label, span: span));
    }

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // ── Left label column ─────────────────────────────────────────────────
        SizedBox(
          width: kLabelW,
          child: Column(children: [
            // Header spacer matching the Gantt header height
            Container(
              height: kHeaderH,
              alignment: Alignment.centerLeft,
              padding: const EdgeInsets.only(left: 12),
              decoration: const BoxDecoration(
                color: Color(0xFF13131F),
                border: Border(bottom: BorderSide(color: Color(0xFF2E2E3E))),
              ),
              child: const Text('Tasks', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 13)),
            ),
            // Task labels
            ...widget.tasks.map((t) => GestureDetector(
              onTap: () => widget.onTap(t),
              child: Container(
                height: kRowH,
                padding: const EdgeInsets.symmetric(horizontal: 10),
                decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: Color(0xFF2E2E3E)))),
                child: Row(children: [
                  Container(width: 6, height: 6, decoration: BoxDecoration(color: t.color, shape: BoxShape.circle)),
                  const SizedBox(width: 6),
                  Expanded(child: Text(t.title, style: const TextStyle(fontSize: 12), overflow: TextOverflow.ellipsis)),
                ]),
              ),
            )),
          ]),
        ),

        // ── Right scrollable grid ─────────────────────────────────────────────
        Expanded(
          child: SingleChildScrollView(
            controller: _scrollCtrl,
            scrollDirection: Axis.horizontal,
            child: SizedBox(
              width: _days * kDayW,
              child: Column(children: [
                // Month + day header
                SizedBox(
                  height: kHeaderH,
                  child: Stack(children: [
                    // Month labels row (top 26px)
                    Positioned(
                      top: 0, left: 0, right: 0, height: 26,
                      child: Row(children: months.map((m) => Container(
                        width: m.span * kDayW,
                        alignment: Alignment.center,
                        decoration: const BoxDecoration(
                          color: Color(0xFF13131F),
                          border: Border(right: BorderSide(color: Color(0xFF2E2E3E))),
                        ),
                        child: Text(m.label, style: const TextStyle(fontSize: 10, color: Colors.white54, fontWeight: FontWeight.bold)),
                      )).toList()),
                    ),
                    // Day numbers row (bottom 30px)
                    Positioned(
                      top: 26, left: 0, right: 0, bottom: 0,
                      child: Row(children: List.generate(_days, (i) {
                        final d = _start.add(Duration(days: i));
                        final isToday = _sameDay(d, DateTime.now());
                        return Container(
                          width: kDayW,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: isToday ? const Color(0xFF7C6AF7).withAlpha(40) : const Color(0xFF13131F),
                            border: const Border(right: BorderSide(color: Color(0xFF2E2E3E))),
                          ),
                          child: Text(
                            '${d.day}',
                            style: TextStyle(fontSize: 9, color: isToday ? const Color(0xFF7C6AF7) : Colors.white38),
                          ),
                        );
                      })),
                    ),
                  ]),
                ),

                // Task bars
                ...widget.tasks.map((t) {
                  final start = _parseDate(t.startDate) ?? _parseDate(t.endDate);
                  final end   = _parseDate(t.endDate) ?? _parseDate(t.startDate);
                  return SizedBox(
                    height: kRowH,
                    child: Stack(children: [
                      // Today line
                      Positioned(
                        left: DateTime.now().difference(_start).inDays * kDayW + kDayW / 2,
                        top: 0, bottom: 0, width: 1,
                        child: Container(color: const Color(0xFF7C6AF7).withAlpha(80)),
                      ),
                      // Grid lines
                      Row(children: List.generate(_days, (i) => Container(
                        width: kDayW,
                        decoration: const BoxDecoration(border: Border(right: BorderSide(color: Color(0xFF2E2E3E)))),
                      ))),
                      // Bar
                      if (start != null && end != null)
                        Positioned(
                          left:  start.difference(_start).inDays * kDayW + 2,
                          top:   8,
                          height: kRowH - 16,
                          width: (end.difference(start).inDays + 1) * kDayW - 4,
                          child: GestureDetector(
                            onTap: () => widget.onTap(t),
                            child: Container(
                              decoration: BoxDecoration(
                                color: t.color.withAlpha(200),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              alignment: Alignment.centerLeft,
                              padding: const EdgeInsets.symmetric(horizontal: 6),
                              child: Text(t.title,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.w600)),
                            ),
                          ),
                        ),
                    ]),
                  );
                }),
              ]),
            ),
          ),
        ),
      ],
    );
  }

  String _monthLabel(DateTime d) => ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.month - 1] + ' ${d.year}';
  bool _sameDay(DateTime a, DateTime b) => a.year == b.year && a.month == b.month && a.day == b.day;
}

// ══════════════════════════════════════════════════════════════════════════════
// ─── TASK EDIT BOTTOM SHEET ──────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
class _TaskEditSheet extends StatefulWidget {
  final Task task;
  final void Function(Task) onSave;
  final VoidCallback onArchive;
  const _TaskEditSheet({required this.task, required this.onSave, required this.onArchive});
  @override
  State<_TaskEditSheet> createState() => _TaskEditSheetState();
}

class _TaskEditSheetState extends State<_TaskEditSheet> {
  late TextEditingController _titleCtrl;
  late String _status, _priority;
  DateTime? _startDate, _endDate;
  String? _dateError;

  @override
  void initState() {
    super.initState();
    _titleCtrl = TextEditingController(text: widget.task.title);
    _status    = widget.task.status;
    _priority  = widget.task.priority;
    _startDate = _parseDate(widget.task.startDate);
    _endDate   = _parseDate(widget.task.endDate);
  }

  @override
  void dispose() { _titleCtrl.dispose(); super.dispose(); }

  /// Validate that end >= start, returns true if valid.
  bool _validateDates() {
    if (_startDate != null && _endDate != null && _endDate!.isBefore(_startDate!)) {
      setState(() => _dateError = 'End date must be after start date');
      return false;
    }
    setState(() => _dateError = null);
    return true;
  }

  Future<void> _pickDate(bool isStart) async {
    final initial = (isStart ? _startDate : _endDate) ?? DateTime.now();
    final first   = isStart ? DateTime(2000) : (_startDate ?? DateTime(2000));
    final picked  = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: first,
      lastDate: DateTime(2100),
      builder: (ctx, child) => Theme(
        data: ThemeData.dark().copyWith(colorScheme: const ColorScheme.dark(primary: Color(0xFF7C6AF7))),
        child: child!,
      ),
    );
    if (picked == null) return;
    setState(() {
      if (isStart) {
        _startDate = picked;
        // Auto-push end date if it's now before start
        if (_endDate != null && _endDate!.isBefore(picked)) _endDate = picked;
      } else {
        _endDate = picked;
      }
    });
    _validateDates();
  }

  void _save() {
    if (!_validateDates()) return;
    widget.onSave(widget.task.copyWith(
      title:     _titleCtrl.text.trim().isEmpty ? null : _titleCtrl.text.trim(),
      status:    _status,
      priority:  _priority,
      startDate: _startDate != null ? _fmtDate(_startDate!) : null,
      endDate:   _endDate   != null ? _fmtDate(_endDate!)   : null,
      clearStartDate: _startDate == null,
      clearEndDate:   _endDate   == null,
    ));
  }

  @override
  Widget build(BuildContext context) {
    final priorityColors = {
      'low': const Color(0xFF6BB6FF), 'medium': const Color(0xFFFFCD5E),
      'high': const Color(0xFFF7926A), 'critical': const Color(0xFFE84040),
    };
    final statusColors = {
      'todo': Colors.white38, 'in-progress': const Color(0xFFFFCD5E),
      'blocked': const Color(0xFFE84040), 'done': const Color(0xFF4CAF50),
    };
    final statusLabels = {'todo': '📋 To Do', 'in-progress': '🔄 In Progress', 'blocked': '🚫 Blocked', 'done': '✅ Done'};

    return Padding(
      padding: EdgeInsets.only(
        left: 20, right: 20, top: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 20,
      ),
      child: SingleChildScrollView(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
          // Title bar
          Row(children: [
            Container(width: 4, height: 24, decoration: BoxDecoration(color: widget.task.color, borderRadius: BorderRadius.circular(2))),
            const SizedBox(width: 10),
            const Text('Edit Task', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const Spacer(),
            IconButton(
              icon: const Icon(Icons.archive_outlined, color: Color(0xFFF7926A)),
              tooltip: 'Archive',
              onPressed: () => showDialog(
                context: context,
                builder: (_) => AlertDialog(
                  backgroundColor: const Color(0xFF1E1E2E),
                  title: const Text('Archive task?'),
                  content: Text('Move "${widget.task.title}" to archive?'),
                  actions: [
                    TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
                    FilledButton(
                      style: FilledButton.styleFrom(backgroundColor: const Color(0xFFF7926A)),
                      onPressed: () { Navigator.pop(context); widget.onArchive(); },
                      child: const Text('Archive'),
                    ),
                  ],
                ),
              ),
            ),
          ]),
          const SizedBox(height: 16),

          // Title field
          TextField(
            controller: _titleCtrl,
            style: const TextStyle(fontSize: 15),
            decoration: InputDecoration(
              labelText: 'Title',
              filled: true, fillColor: const Color(0xFF252535),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
            ),
          ),
          const SizedBox(height: 14),

          // Status chips
          const Text('Status', style: TextStyle(fontSize: 12, color: Colors.white54)),
          const SizedBox(height: 6),
          Wrap(spacing: 8, children: kStatuses.map((s) => ChoiceChip(
            label: Text(statusLabels[s]!),
            selected: _status == s,
            selectedColor: statusColors[s]!.withAlpha(60),
            labelStyle: TextStyle(color: _status == s ? statusColors[s] : Colors.white54, fontSize: 12),
            onSelected: (_) => setState(() => _status = s),
          )).toList()),
          const SizedBox(height: 14),

          // Priority chips
          const Text('Priority', style: TextStyle(fontSize: 12, color: Colors.white54)),
          const SizedBox(height: 6),
          Wrap(spacing: 8, children: kPriorities.map((p) => ChoiceChip(
            label: Text(p.toUpperCase()),
            selected: _priority == p,
            selectedColor: priorityColors[p]!.withAlpha(60),
            labelStyle: TextStyle(color: _priority == p ? priorityColors[p] : Colors.white54, fontSize: 12),
            onSelected: (_) => setState(() => _priority = p),
          )).toList()),
          const SizedBox(height: 14),

          // Date pickers
          const Text('Dates', style: TextStyle(fontSize: 12, color: Colors.white54)),
          const SizedBox(height: 6),
          Row(children: [
            Expanded(child: _DateButton(
              label: 'Start',
              date: _startDate,
              onTap: () => _pickDate(true),
              onClear: () => setState(() { _startDate = null; _validateDates(); }),
            )),
            const SizedBox(width: 10),
            Expanded(child: _DateButton(
              label: 'End / Due',
              date: _endDate,
              onTap: () => _pickDate(false),
              onClear: () => setState(() { _endDate = null; _validateDates(); }),
            )),
          ]),
          if (_dateError != null) ...[
            const SizedBox(height: 6),
            Row(children: [
              const Icon(Icons.error_outline, color: Color(0xFFE84040), size: 14),
              const SizedBox(width: 4),
              Text(_dateError!, style: const TextStyle(color: Color(0xFFE84040), fontSize: 12)),
            ]),
          ],
          const SizedBox(height: 20),

          // Save button
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: _save,
              icon: const Icon(Icons.save),
              label: const Text('Save changes'),
            ),
          ),
        ]),
      ),
    );
  }
}

class _DateButton extends StatelessWidget {
  final String label;
  final DateTime? date;
  final VoidCallback onTap, onClear;
  const _DateButton({required this.label, required this.date, required this.onTap, required this.onClear});

  @override
  Widget build(BuildContext context) => InkWell(
    onTap: onTap,
    borderRadius: BorderRadius.circular(10),
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(color: const Color(0xFF252535), borderRadius: BorderRadius.circular(10)),
      child: Row(children: [
        const Icon(Icons.calendar_today, size: 14, color: Color(0xFF7C6AF7)),
        const SizedBox(width: 6),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(label, style: const TextStyle(fontSize: 10, color: Colors.white38)),
          Text(date != null ? _fmtDate(date!) : 'Not set',
              style: TextStyle(fontSize: 12, color: date != null ? Colors.white : Colors.white38)),
        ])),
        if (date != null) GestureDetector(
          onTap: onClear,
          child: const Icon(Icons.close, size: 14, color: Colors.white38),
        ),
      ]),
    ),
  );
}

// ─── Shared small widgets ─────────────────────────────────────────────────────
class _DueBadge extends StatelessWidget {
  final Task task;
  const _DueBadge({required this.task});
  @override
  Widget build(BuildContext context) {
    final days = task.daysUntilDue;
    final overdue = task.isOverdue;
    String text; Color color;
    if (overdue)      { text = 'Overdue ${(-days).abs()}d'; color = const Color(0xFFE84040); }
    else if (days==0) { text = 'Due today';                 color = const Color(0xFFFFCD5E); }
    else if (days<=3) { text = 'Due in ${days}d';           color = const Color(0xFFF7926A); }
    else              { text = '🗓 ${task.endDate}';        color = Colors.white38; }
    return Text(text, style: TextStyle(fontSize: 11, color: color, fontWeight: overdue || days<=3 ? FontWeight.bold : FontWeight.normal));
  }
}

class _Badge extends StatelessWidget {
  final String label;
  final Color color;
  const _Badge({required this.label, required this.color});
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
    decoration: BoxDecoration(
      color: color.withAlpha(40), borderRadius: BorderRadius.circular(4),
      border: Border.all(color: color.withAlpha(100)),
    ),
    child: Text(label, style: TextStyle(color: color, fontSize: 9, fontWeight: FontWeight.bold)),
  );
}

// ─── Task card (List view) ────────────────────────────────────────────────────
class _TaskCard extends StatelessWidget {
  final Task task;
  final void Function(Task) onTap;
  const _TaskCard({required this.task, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final priorityColor = {
      'low': const Color(0xFF6BB6FF), 'medium': const Color(0xFFFFCD5E),
      'high': const Color(0xFFF7926A), 'critical': const Color(0xFFE84040),
    }[task.priority] ?? Colors.white38;
    final statusColor = {
      'todo': Colors.white38, 'in-progress': const Color(0xFFFFCD5E),
      'blocked': const Color(0xFFE84040), 'done': const Color(0xFF4CAF50),
    }[task.status] ?? Colors.white38;
    final statusLabel = {'todo': '📋 To Do', 'in-progress': '🔄 In Progress', 'blocked': '🚫 Blocked', 'done': '✅ Done'}[task.status] ?? task.status;

    return Card(
      margin: const EdgeInsets.symmetric(vertical: 5),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: InkWell(
        onTap: () => onTap(task),
        borderRadius: BorderRadius.circular(10),
        child: IntrinsicHeight(
          child: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
            Container(width: 4, decoration: BoxDecoration(
              color: task.color,
              borderRadius: const BorderRadius.only(topLeft: Radius.circular(10), bottomLeft: Radius.circular(10)),
            )),
            Expanded(child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Expanded(child: Text(task.title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15))),
                  _Badge(label: task.priority.toUpperCase(), color: priorityColor),
                ]),
                const SizedBox(height: 6),
                Row(children: [
                  Text(statusLabel, style: TextStyle(fontSize: 12, color: statusColor)),
                  const SizedBox(width: 8),
                  if (task.endDate != null) _DueBadge(task: task),
                ]),
              ]),
            )),
            const Padding(padding: EdgeInsets.symmetric(vertical: 12, horizontal: 8),
              child: Icon(Icons.chevron_right, color: Colors.white24, size: 18)),
          ]),
        ),
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// ─── NEW TASK SHEET ──────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

class _NewTaskSheet extends StatefulWidget {
  /// Called with (title, status, priority, startDate?, endDate?)
  final void Function(String, String, String, String?, String?) onCreate;
  const _NewTaskSheet({required this.onCreate});
  @override
  State<_NewTaskSheet> createState() => _NewTaskSheetState();
}

class _NewTaskSheetState extends State<_NewTaskSheet> {
  final _titleCtrl = TextEditingController();
  String _status   = 'todo';
  String _priority = 'medium';
  DateTime? _startDate, _endDate;
  String? _error;

  @override
  void dispose() { _titleCtrl.dispose(); super.dispose(); }

  Future<void> _pickDate(bool isStart) async {
    final initial = (isStart ? _startDate : _endDate) ?? DateTime.now();
    final first   = isStart ? DateTime(2000) : (_startDate ?? DateTime(2000));
    final picked  = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: first,
      lastDate: DateTime(2100),
      builder: (ctx, child) => Theme(
        data: ThemeData.dark().copyWith(colorScheme: const ColorScheme.dark(primary: Color(0xFF7C6AF7))),
        child: child!,
      ),
    );
    if (picked == null) return;
    setState(() {
      if (isStart) {
        _startDate = picked;
        if (_endDate != null && _endDate!.isBefore(picked)) _endDate = picked;
      } else {
        _endDate = picked;
      }
    });
  }

  void _submit() {
    final title = _titleCtrl.text.trim();
    if (title.isEmpty) {
      setState(() => _error = 'Title is required');
      return;
    }
    if (_startDate != null && _endDate != null && _endDate!.isBefore(_startDate!)) {
      setState(() => _error = 'End date must be after start date');
      return;
    }
    widget.onCreate(
      title, _status, _priority,
      _startDate != null ? _fmtDate(_startDate!) : null,
      _endDate   != null ? _fmtDate(_endDate!)   : null,
    );
  }

  @override
  Widget build(BuildContext context) {
    final priorityColors = {
      'low': const Color(0xFF6BB6FF), 'medium': const Color(0xFFFFCD5E),
      'high': const Color(0xFFF7926A), 'critical': const Color(0xFFE84040),
    };
    final statusColors = {
      'todo': Colors.white38, 'in-progress': const Color(0xFFFFCD5E),
      'blocked': const Color(0xFFE84040), 'done': const Color(0xFF4CAF50),
    };
    final statusLabels = {
      'todo': '📋 To Do', 'in-progress': '🔄 In Progress',
      'blocked': '🚫 Blocked', 'done': '✅ Done',
    };

    return Padding(
      padding: EdgeInsets.only(
        left: 20, right: 20, top: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: SingleChildScrollView(
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          // Header
          Row(children: [
            const Icon(Icons.add_task, color: Color(0xFF7C6AF7)),
            const SizedBox(width: 10),
            const Text('New Task', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const Spacer(),
            IconButton(
              icon: const Icon(Icons.close),
              onPressed: () => Navigator.pop(context),
              visualDensity: VisualDensity.compact,
            ),
          ]),
          const SizedBox(height: 14),

          // Title
          TextField(
            controller: _titleCtrl,
            autofocus: true,
            style: const TextStyle(fontSize: 15),
            textCapitalization: TextCapitalization.sentences,
            decoration: InputDecoration(
              labelText: 'Task title *',
              filled: true, fillColor: const Color(0xFF252535),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
              errorText: _error,
            ),
            onSubmitted: (_) => _submit(),
          ),
          const SizedBox(height: 14),

          // Status
          const Text('Status', style: TextStyle(fontSize: 12, color: Colors.white54)),
          const SizedBox(height: 6),
          Wrap(spacing: 8, children: kStatuses.map((s) => ChoiceChip(
            label: Text(statusLabels[s]!),
            selected: _status == s,
            selectedColor: (statusColors[s]!).withAlpha(60),
            labelStyle: TextStyle(color: _status == s ? statusColors[s] : Colors.white54, fontSize: 12),
            onSelected: (_) => setState(() => _status = s),
          )).toList()),
          const SizedBox(height: 14),

          // Priority
          const Text('Priority', style: TextStyle(fontSize: 12, color: Colors.white54)),
          const SizedBox(height: 6),
          Wrap(spacing: 8, children: kPriorities.map((p) => ChoiceChip(
            label: Text(p.toUpperCase()),
            selected: _priority == p,
            selectedColor: priorityColors[p]!.withAlpha(60),
            labelStyle: TextStyle(color: _priority == p ? priorityColors[p] : Colors.white54, fontSize: 12),
            onSelected: (_) => setState(() => _priority = p),
          )).toList()),
          const SizedBox(height: 14),

          // Dates
          const Text('Dates', style: TextStyle(fontSize: 12, color: Colors.white54)),
          const SizedBox(height: 6),
          Row(children: [
            Expanded(child: _DateButton(
              label: 'Start',
              date: _startDate,
              onTap: () => _pickDate(true),
              onClear: () => setState(() => _startDate = null),
            )),
            const SizedBox(width: 10),
            Expanded(child: _DateButton(
              label: 'End / Due',
              date: _endDate,
              onTap: () => _pickDate(false),
              onClear: () => setState(() => _endDate = null),
            )),
          ]),
          const SizedBox(height: 20),

          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: _submit,
              icon: const Icon(Icons.add),
              label: const Text('Create task'),
            ),
          ),
        ]),
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// ─── SYNC UI ─────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

enum _SyncStatus { idle, syncing, ok, error }

/// Compact AppBar button showing sync state.
class _SyncButton extends StatelessWidget {
  final _SyncStatus status;
  final String info;
  final VoidCallback onTap;
  final VoidCallback onLongPress;
  const _SyncButton({
    required this.status, required this.info,
    required this.onTap,  required this.onLongPress,
  });

  @override
  Widget build(BuildContext context) {
    Widget icon;
    Color color;
    String tooltip;

    switch (status) {
      case _SyncStatus.syncing:
        icon    = const SizedBox(width: 18, height: 18,
            child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF7C6AF7)));
        color   = const Color(0xFF7C6AF7);
        tooltip = 'Syncing…';
      case _SyncStatus.ok:
        icon    = const Icon(Icons.cloud_done, size: 20);
        color   = const Color(0xFF4CAF50);
        tooltip = 'Synced  $info\nLong-press to reconfigure';
      case _SyncStatus.error:
        icon    = const Icon(Icons.cloud_off, size: 20);
        color   = const Color(0xFFE84040);
        tooltip = 'Sync error: $info\nLong-press to reconfigure';
      case _SyncStatus.idle:
        icon    = const Icon(Icons.cloud_upload_outlined, size: 20);
        color   = Colors.white38;
        tooltip = 'Sync to cloud\nLong-press to configure';
    }

    return Tooltip(
      message: tooltip,
      child: InkWell(
        onTap: onTap,
        onLongPress: onLongPress,
        borderRadius: BorderRadius.circular(20),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          child: IconTheme(data: IconThemeData(color: color), child: icon),
        ),
      ),
    );
  }
}

/// Bottom-sheet for configuring the sync server URL + credentials.
/// Supports three modes: login, register (with OTP verification step), and
/// a quick "change URL / re-login" mode when credentials already exist.
enum _AuthMode { login, register }

class _SyncSetupSheet extends StatefulWidget {
  final VoidCallback onSaved;
  const _SyncSetupSheet({required this.onSaved});
  @override
  State<_SyncSetupSheet> createState() => _SyncSetupSheetState();
}

class _SyncSetupSheetState extends State<_SyncSetupSheet> {
  // ── shared ──────────────────────────────────────────────────────────────────
  final _urlCtrl   = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _passCtrl  = TextEditingController();
  bool _obscure    = true;
  bool _busy       = false;
  String? _error;
  _AuthMode _mode  = _AuthMode.login;

  // ── register-only ────────────────────────────────────────────────────────────
  final _firstNameCtrl = TextEditingController();
  final _lastNameCtrl  = TextEditingController();

  // ── OTP verification step ─────────────────────────────────────────────────
  bool _waitingForOtp = false;
  final _otpCtrl      = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadSaved();
  }

  Future<void> _loadSaved() async {
    final creds = await SyncService.savedCredentials();
    if (!mounted) return;
    setState(() {
      _urlCtrl.text   = creds.baseUrl;
      _emailCtrl.text = creds.email;
    });
  }

  @override
  void dispose() {
    _urlCtrl.dispose();
    _emailCtrl.dispose();
    _passCtrl.dispose();
    _firstNameCtrl.dispose();
    _lastNameCtrl.dispose();
    _otpCtrl.dispose();
    super.dispose();
  }

  // ── Login ──────────────────────────────────────────────────────────────────
  Future<void> _doLogin() async {
    final url   = _urlCtrl.text.trim();
    final email = _emailCtrl.text.trim();
    final pass  = _passCtrl.text;
    if (url.isEmpty || email.isEmpty || pass.isEmpty) {
      setState(() => _error = 'All fields are required'); return;
    }
    setState(() { _busy = true; _error = null; });
    await SyncService.configure(baseUrl: url, email: email, password: pass);
    final err = await SyncService.login(email: email, password: pass);
    if (!mounted) return;
    if (err != null) { setState(() { _busy = false; _error = err; }); return; }
    widget.onSaved();
  }

  // ── Register → OTP flow ────────────────────────────────────────────────────
  Future<void> _doRegister() async {
    final url   = _urlCtrl.text.trim();
    final email = _emailCtrl.text.trim();
    final pass  = _passCtrl.text;
    final first = _firstNameCtrl.text.trim();
    final last  = _lastNameCtrl.text.trim();
    if (url.isEmpty || email.isEmpty || pass.isEmpty || first.isEmpty || last.isEmpty) {
      setState(() => _error = 'All fields are required'); return;
    }
    setState(() { _busy = true; _error = null; });
    final err = await SyncService.register(
      baseUrl: url, email: email, password: pass,
      firstName: first, lastName: last,
    );
    if (!mounted) return;
    if (err != null) { setState(() { _busy = false; _error = err; }); return; }
    // Success → move to OTP step
    setState(() { _busy = false; _waitingForOtp = true; });
  }

  Future<void> _doVerifyOtp() async {
    final url   = _urlCtrl.text.trim();
    final email = _emailCtrl.text.trim();
    final otp   = _otpCtrl.text.trim();
    if (otp.isEmpty) { setState(() => _error = 'Enter the OTP from your email'); return; }
    setState(() { _busy = true; _error = null; });
    final err = await SyncService.verifyOtp(baseUrl: url, email: email, otp: otp);
    if (!mounted) return;
    if (err != null) { setState(() { _busy = false; _error = err; }); return; }
    // verifyOtp caches the token, now store password for future re-logins
    await SyncService.configure(baseUrl: url, email: email, password: _passCtrl.text);
    widget.onSaved();
  }

  // ── Build ──────────────────────────────────────────────────────────────────
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        left: 20, right: 20, top: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: SingleChildScrollView(
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          // ── Header ──────────────────────────────────────────────────────────
          Row(children: [
            const Icon(Icons.cloud_sync, color: Color(0xFF7C6AF7)),
            const SizedBox(width: 10),
            Text(
              _waitingForOtp ? 'Verify your email'
                  : _mode == _AuthMode.register ? 'Create account' : 'Cloud Sync Setup',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const Spacer(),
            IconButton(
              icon: const Icon(Icons.close),
              onPressed: () => Navigator.pop(context),
              visualDensity: VisualDensity.compact,
            ),
          ]),
          const SizedBox(height: 4),
          Text(
            _waitingForOtp
                ? 'Enter the 6-digit code sent to ${_emailCtrl.text}.'
                : _mode == _AuthMode.register
                    ? 'Create a new account on your sync server.'
                    : 'Enter your sync server URL and credentials.',
            style: const TextStyle(fontSize: 12, color: Colors.white54),
          ),
          const SizedBox(height: 16),

          if (!_waitingForOtp) ...[
            // ── Server URL ───────────────────────────────────────────────────
            _field(_urlCtrl, 'Server URL',
                hint: 'https://yourname.heliohost.us/gantt/backend'),
            const SizedBox(height: 10),

            // ── Register-only extra fields ───────────────────────────────────
            if (_mode == _AuthMode.register) ...[
              Row(children: [
                Expanded(child: _field(_firstNameCtrl, 'First name')),
                const SizedBox(width: 10),
                Expanded(child: _field(_lastNameCtrl, 'Last name')),
              ]),
              const SizedBox(height: 10),
            ],

            // ── Email & password ─────────────────────────────────────────────
            _field(_emailCtrl, 'Email', hint: 'you@example.com'),
            const SizedBox(height: 10),
            TextField(
              controller: _passCtrl,
              obscureText: _obscure,
              style: const TextStyle(fontSize: 14),
              decoration: InputDecoration(
                labelText: 'Password',
                filled: true, fillColor: const Color(0xFF252535),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
                suffixIcon: IconButton(
                  icon: Icon(_obscure ? Icons.visibility_off : Icons.visibility, size: 18),
                  onPressed: () => setState(() => _obscure = !_obscure),
                ),
              ),
            ),
          ] else ...[
            // ── OTP field ────────────────────────────────────────────────────
            TextField(
              controller: _otpCtrl,
              autofocus: true,
              keyboardType: TextInputType.number,
              maxLength: 6,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 24, letterSpacing: 8),
              decoration: InputDecoration(
                hintText: '000000',
                hintStyle: const TextStyle(color: Colors.white24),
                counterText: '',
                filled: true, fillColor: const Color(0xFF252535),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
              ),
              onSubmitted: (_) => _doVerifyOtp(),
            ),
          ],

          // ── Error ──────────────────────────────────────────────────────────
          if (_error != null) ...[
            const SizedBox(height: 8),
            Row(children: [
              const Icon(Icons.error_outline, color: Color(0xFFE84040), size: 14),
              const SizedBox(width: 4),
              Expanded(child: Text(_error!, style: const TextStyle(color: Color(0xFFE84040), fontSize: 12))),
            ]),
          ],
          const SizedBox(height: 20),

          // ── Primary action button ──────────────────────────────────────────
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: _busy ? null : () {
                if (_waitingForOtp)              _doVerifyOtp();
                else if (_mode == _AuthMode.register) _doRegister();
                else                             _doLogin();
              },
              icon: _busy
                  ? const SizedBox(width: 16, height: 16,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                  : Icon(_waitingForOtp ? Icons.check_circle_outline
                        : _mode == _AuthMode.register ? Icons.person_add : Icons.login),
              label: Text(_busy ? 'Please wait…'
                  : _waitingForOtp ? 'Verify & sign in'
                  : _mode == _AuthMode.register ? 'Create account' : 'Connect & sync'),
            ),
          ),
          const SizedBox(height: 10),

          // ── Mode toggle ────────────────────────────────────────────────────
          if (!_waitingForOtp)
            Center(
              child: TextButton(
                onPressed: () => setState(() {
                  _mode  = _mode == _AuthMode.login ? _AuthMode.register : _AuthMode.login;
                  _error = null;
                }),
                child: Text(
                  _mode == _AuthMode.login ? "Don't have an account? Sign up" : 'Already have an account? Log in',
                  style: const TextStyle(fontSize: 12, color: Color(0xFF7C6AF7)),
                ),
              ),
            ),

          // ── Disconnect ────────────────────────────────────────────────────
          Center(
            child: TextButton(
              onPressed: () async {
                await SyncService.clearCredentials();
                if (mounted) Navigator.pop(context);
              },
              child: const Text('Disconnect / clear credentials',
                  style: TextStyle(fontSize: 12, color: Colors.white38)),
            ),
          ),
        ]),
      ),
    );
  }

  Widget _field(TextEditingController ctrl, String label, {String hint = ''}) =>
      TextField(
        controller: ctrl,
        style: const TextStyle(fontSize: 14),
        decoration: InputDecoration(
          labelText: label,
          hintText: hint,
          hintStyle: const TextStyle(fontSize: 12, color: Colors.white24),
          filled: true, fillColor: const Color(0xFF252535),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
        ),
      );
}
