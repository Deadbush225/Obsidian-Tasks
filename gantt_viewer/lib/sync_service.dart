import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

// ─── Model ────────────────────────────────────────────────────────────────────

/// Represents a conflict: the server has a newer version of this task.
class SyncConflict {
  final Map<String, dynamic> serverTask;
  const SyncConflict(this.serverTask);
}

/// Result returned after a sync cycle.
class SyncResult {
  final int pushed;
  final int pulled;
  final List<SyncConflict> conflicts;
  /// Tasks pulled from the server that should be written/updated locally.
  /// Each map contains the same fields as the server's task JSON (camelCase).
  final List<Map<String, dynamic>> pulledTasks;
  /// IDs of tasks that have been archived (soft-deleted) on the server.
  /// Callers should delete the matching local .md files.
  final List<String> archivedIds;
  final String? error;

  const SyncResult({
    this.pushed = 0,
    this.pulled = 0,
    this.conflicts = const [],
    this.pulledTasks = const [],
    this.archivedIds = const [],
    this.error,
  });

  bool get hasConflicts => conflicts.isNotEmpty;
  bool get ok => error == null;
}

// ─── Service ──────────────────────────────────────────────────────────────────

class SyncService {
  static const _prefKeyToken     = 'sync_token';
  static const _prefKeyBaseUrl   = 'sync_base_url';
  static const _prefKeyLastPull  = 'sync_last_pull_at';
  static const _prefKeyEmail     = 'sync_email';
  static const _prefKeyPassword  = 'sync_password';   // stored for re-auth only

  // ── Configuration ─────────────────────────────────────────────────────────

  static Future<void> configure({
    required String baseUrl,
    required String email,
    required String password,
  }) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_prefKeyBaseUrl,  baseUrl.endsWith('/') ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl);
    await prefs.setString(_prefKeyEmail,    email);
    await prefs.setString(_prefKeyPassword, password);
  }

  static Future<String?> get baseUrl async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_prefKeyBaseUrl);
  }

  static Future<bool> get isConfigured async => (await baseUrl) != null;

  static Future<void> clearCredentials() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_prefKeyToken);
    await prefs.remove(_prefKeyEmail);
    await prefs.remove(_prefKeyPassword);
    await prefs.remove(_prefKeyLastPull);
  }

  // ── Auth ──────────────────────────────────────────────────────────────────

  /// Login and cache the JWT token.  Returns null on success, error string on failure.
  static Future<String?> login({String? email, String? password}) async {
    final prefs = await SharedPreferences.getInstance();
    final url   = prefs.getString(_prefKeyBaseUrl);
    final e     = email    ?? prefs.getString(_prefKeyEmail)    ?? '';
    final p     = password ?? prefs.getString(_prefKeyPassword) ?? '';

    if (url == null || e.isEmpty || p.isEmpty) return 'Not configured';

    try {
      final res = await http.post(
        Uri.parse('$url/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': e, 'password': p}),
      ).timeout(const Duration(seconds: 15));

      final body = jsonDecode(res.body) as Map<String, dynamic>;
      if (res.statusCode == 200 && body['token'] != null) {
        await prefs.setString(_prefKeyToken, body['token']);
        return null; // success
      }
      return body['msg'] ?? 'Login failed (${res.statusCode})';
    } catch (ex) {
      return ex.toString();
    }
  }

  static Future<String?> _token() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_prefKeyToken);
  }

  static Future<Map<String, String>> _authHeaders() async {
    final tok = await _token();
    return {
      'Content-Type': 'application/json',
      if (tok != null) 'Authorization': 'Bearer $tok',
    };
  }

  // ── Core sync ─────────────────────────────────────────────────────────────

  /// Push [localTasks] to the server and pull back anything newer than our
  /// last pull timestamp.
  ///
  /// [localTasks] should be a list of plain Maps matching the Task.toJson()
  /// schema.  The caller is responsible for mapping Task objects before calling.
  ///
  /// Returns a [SyncResult] — on conflict the caller should present the
  /// conflict list to the user / apply server versions automatically.
  static Future<SyncResult> sync(List<Map<String, dynamic>> localTasks) async {
    final url = await baseUrl;
    if (url == null) {
      return const SyncResult(error: 'Sync not configured');
    }

    // Ensure we have a valid token (try silent re-auth once)
    if (await _token() == null) {
      final err = await login();
      if (err != null) return SyncResult(error: 'Auth failed: $err');
    }

    final headers = await _authHeaders();

    // 1. PUSH local tasks ────────────────────────────────────────────────────
    int pushed = 0;
    List<SyncConflict> conflicts = [];

    if (localTasks.isNotEmpty) {
      try {
        final pushRes = await http.post(
          Uri.parse('$url/tasks/push'),
          headers: headers,
          body: jsonEncode({'tasks': localTasks}),
        ).timeout(const Duration(seconds: 30));

        if (pushRes.statusCode == 401) {
          // Token expired — re-auth once and retry
          final err = await login();
          if (err != null) return SyncResult(error: 'Re-auth failed: $err');
          return sync(localTasks); // tail-recurse once
        }

        if (pushRes.statusCode == 200) {
          final body = jsonDecode(pushRes.body) as Map<String, dynamic>;
          pushed    = (body['accepted'] as List?)?.length ?? 0;
          final raw = (body['conflicts'] as List?) ?? [];
          conflicts = raw.map((c) => SyncConflict(c as Map<String, dynamic>)).toList();
        } else {
          final msg = (jsonDecode(pushRes.body) as Map)['msg'] ?? pushRes.statusCode;
          return SyncResult(error: 'Push failed: $msg');
        }
      } catch (ex) {
        return SyncResult(error: 'Push error: $ex');
      }
    }

    // 2. PULL server changes since last sync ─────────────────────────────────
    final prefs   = await SharedPreferences.getInstance();
    final since   = prefs.getInt(_prefKeyLastPull) ?? 0;

    int pulled = 0;
    List<Map<String, dynamic>> serverTasks = [];

    try {
      final pullRes = await http.get(
        Uri.parse('$url/tasks/pull?since=$since'),
        headers: headers,
      ).timeout(const Duration(seconds: 20));

      if (pullRes.statusCode == 200) {
        final body = jsonDecode(pullRes.body) as Map<String, dynamic>;
        serverTasks = List<Map<String, dynamic>>.from(body['tasks'] ?? []);
        pulled      = serverTasks.length;
        final pulledAt = body['pulledAt'] as int?;
        if (pulledAt != null) {
          await prefs.setInt(_prefKeyLastPull, pulledAt);
        }
      }
      // Ignore pull errors silently — push succeeded
    } catch (_) {}

    return SyncResult(
      pushed:      pushed,
      pulled:      pulled,
      conflicts:   conflicts,
      pulledTasks: serverTasks.where((t) => !(t['isArchived'] as bool? ?? false)).toList(),
      archivedIds: serverTasks
          .where((t) => t['isArchived'] as bool? ?? false)
          .map((t) => t['id'] as String)
          .toList(),
    );
  }

  /// Convenience: push a single task update (e.g. after editing).
  static Future<SyncResult> pushOne(Map<String, dynamic> task) =>
      sync([task]);

  /// Archive (soft-delete) a task on the server.
  static Future<String?> archiveRemote(String taskId) async {
    final url = await baseUrl;
    if (url == null) return null; // sync not configured, ignore

    final headers = await _authHeaders();
    try {
      final res = await http.delete(
        Uri.parse('$url/tasks/$taskId'),
        headers: headers,
      ).timeout(const Duration(seconds: 15));

      if (res.statusCode == 200) return null;
      return (jsonDecode(res.body) as Map)['msg']?.toString() ?? 'Error ${res.statusCode}';
    } catch (ex) {
      return ex.toString();
    }
  }

  /// Full pull — returns all tasks from server (no delta).
  /// Used on initial / forced full-sync.
  static Future<({List<Map<String, dynamic>> tasks, String? error})>
      pullAll() async {
    final url = await baseUrl;
    if (url == null) return (tasks: <Map<String, dynamic>>[], error: 'Sync not configured');

    final headers = await _authHeaders();
    try {
      final res = await http.get(
        Uri.parse('$url/tasks'),
        headers: headers,
      ).timeout(const Duration(seconds: 20));

      if (res.statusCode == 200) {
        final list = (jsonDecode(res.body) as List)
            .cast<Map<String, dynamic>>();
        return (tasks: list, error: null);
      }
      final msg = (jsonDecode(res.body) as Map)['msg']?.toString();
      return (tasks: <Map<String, dynamic>>[], error: msg ?? 'Error ${res.statusCode}');
    } catch (ex) {
      return (tasks: <Map<String, dynamic>>[], error: ex.toString());
    }
  }

  // ── Credentials helpers (for UI) ──────────────────────────────────────────

  static Future<({String email, String baseUrl})> savedCredentials() async {
    final prefs = await SharedPreferences.getInstance();
    return (
      email:   prefs.getString(_prefKeyEmail)   ?? '',
      baseUrl: prefs.getString(_prefKeyBaseUrl) ?? '',
    );
  }

  static Future<bool> get hasToken async => (await _token()) != null;

  // ── Account creation (signup) ──────────────────────────────────────────────

  /// Register a new account.  Returns null on success, error string on failure.
  static Future<String?> register({
    required String baseUrl,
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  }) async {
    final url = baseUrl.endsWith('/')
        ? baseUrl.substring(0, baseUrl.length - 1)
        : baseUrl;
    try {
      final res = await http.post(
        Uri.parse('$url/auth/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'password': password,
          'first_name': firstName,
          'last_name': lastName,
        }),
      ).timeout(const Duration(seconds: 15));
      final body = jsonDecode(res.body) as Map<String, dynamic>;
      if (res.statusCode == 200 || res.statusCode == 201) return null; // success
      return body['msg'] ?? 'Registration failed (${res.statusCode})';
    } catch (ex) {
      return ex.toString();
    }
  }

  /// Verify email with OTP code after registration.
  /// On success, logs in automatically and caches the token.
  static Future<String?> verifyOtp({
    required String baseUrl,
    required String email,
    required String otp,
  }) async {
    final url = baseUrl.endsWith('/')
        ? baseUrl.substring(0, baseUrl.length - 1)
        : baseUrl;
    try {
      final res = await http.post(
        Uri.parse('$url/auth/verify-otp'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'otp': otp, 'purpose': 'register'}),
      ).timeout(const Duration(seconds: 15));
      final body = jsonDecode(res.body) as Map<String, dynamic>;
      if (res.statusCode == 200 && body['token'] != null) {
        // cache token + credentials for future syncs
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString(_prefKeyToken,   body['token']);
        await prefs.setString(_prefKeyBaseUrl, url);
        await prefs.setString(_prefKeyEmail,   email);
        return null; // success
      }
      return body['msg'] ?? 'OTP verification failed (${res.statusCode})';
    } catch (ex) {
      return ex.toString();
    }
  }
}
