import { App } from 'obsidian';
import type { Task } from './types';
import { loadProjects, generateTaskFrontmatter } from './taskUtils';

// Key used in Obsidian localStorage to persist the last-pull timestamp.
const LS_LAST_PULL = 'gantt_sync_last_pull_at';

export class GanttSyncService {
  private baseUrl: string;
  private email: string;
  private password: string;
  private token: string | null = null;

  constructor(baseUrl: string, email: string, password: string) {
    this.baseUrl  = baseUrl.replace(/\/$/, '');
    this.email    = email;
    this.password = password;
  }

  private async _fetch(path: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) ?? {}),
    };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

    const res = await fetch(url, { ...options, headers });
    const text = await res.text();
    let json: any;
    try { json = JSON.parse(text); } catch { json = { error: text }; }
    if (!res.ok) throw new Error(json?.error ?? json?.message ?? `HTTP ${res.status}`);
    return json;
  }

  /** Authenticate and cache the JWT. Throws on failure. */
  async login(): Promise<void> {
    const data = await this._fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: this.email, password: this.password }),
    });
    this.token = data.token ?? data.access_token ?? null;
    if (!this.token) throw new Error('Login response missing token');
  }

  /**
   * Full bidirectional sync:
   *  1. Read all local .md tasks with their updatedAt timestamps.
   *  2. Push them all to the server (server uses "highest timestamp wins").
   *  3. Server returns any tasks where it held a NEWER version (conflicts).
   *     Apply those server-wins back to local .md files.
   *  4. Pull everything updated on the server since our last pull timestamp.
   *     Apply those to local .md files (create / update / delete).
   *
   * Returns a summary { pushed, pulled, conflicts, deleted, conflictTasks }.
   * `conflictTasks` are the raw server objects for tasks where the server won —
   * callers can present these to the user and call forcePushTasks() if they
   * choose to override the server with their local version.
   */
  async syncAll(app: App, projectsFolder: string): Promise<{ pushed: number; pulled: number; conflicts: number; deleted: number; conflictTasks: any[] }> {
    const since = parseInt(localStorage.getItem(LS_LAST_PULL) ?? '0', 10) || 0;

    // ── 1. Collect all local tasks ───────────────────────────────────────────
    const projects = await loadProjects(app, projectsFolder);
    const localTasks: Task[] = ([] as Task[]).concat(...projects.map((p) => p.tasks));

    // Build a lookup: id → task
    const localById = new Map<string, Task>(localTasks.map((t: Task) => [t.id, t]));

    // ── 2. Push local tasks with their timestamps ────────────────────────────
    let pushed = 0;
    let serverConflicts: any[] = [];

    if (localTasks.length > 0) {
      // Read the raw file content for every local task so we can send the
      // full frontmatter to the server.  The server stores it verbatim in
      // `raw_frontmatter` and returns it on pull — that way every client
      // (Obsidian, Flutter, …) can reconstruct the exact file without losing
      // any fields it doesn't natively understand.
      const rawContents = await Promise.all(
        localTasks.map(async (t: Task) => {
          try {
            const file = app.vault.getFileByPath(t.filePath);
            return file ? await app.vault.read(file) : null;
          } catch { return null; }
        })
      );

      const payload = localTasks.map((t: Task, i: number) => ({
        id:             t.id,
        title:          t.title,
        status:         t.status,
        priority:       t.priority,
        start_date:     t.startDate  ?? '',
        end_date:       t.endDate    ?? '',
        assignee:       t.assignee   ?? '',
        tags:           (t.tags ?? []).join(','),
        description:    t.description ?? '',
        project_folder: t.projectFolder ?? '',
        file_path:      t.filePath ?? '',
        updatedAt:      t.updatedAt || Date.now(),   // ← critical: server uses this for conflict resolution
        rawFrontmatter: rawContents[i] ?? null,      // ← full .md content so server stores it verbatim
      }));

      const pushResult = await this._fetch('/tasks/push', {
        method: 'POST',
        body: JSON.stringify({ tasks: payload }),
      });

      pushed = (pushResult.accepted as string[])?.length ?? 0;
      serverConflicts = (pushResult.conflicts as any[]) ?? [];
    }

    // ── 3. Apply server-wins conflicts back to local .md files ───────────────
    // The server returned these because it has a newer version than we pushed.
    let conflicts = 0;
    for (const rt of serverConflicts) {
      await this._applyRemoteTask(app, rt, projectsFolder, localById);
      conflicts++;
    }

    // ── 4. Pull everything the server updated since our last pull ────────────
    const pullResult = await this._fetch(`/tasks/pull?since=${since}`);
    const remoteTasks: any[] = pullResult.tasks ?? [];
    const pulledAt: number   = pullResult.pulledAt ?? Date.now();

    let pulled  = 0;
    let deleted = 0;

    for (const rt of remoteTasks) {
      const local = localById.get(rt.id);
      const remoteTs = rt.updatedAt ?? 0;
      const localTs  = local?.updatedAt ?? 0;

      // Skip if our local copy is already equal or newer
      if (local && localTs >= remoteTs) continue;

      if (rt.isArchived) {
        // Server says deleted → remove local file if it exists
        if (local) {
          const file = app.vault.getFileByPath(local.filePath);
          if (file) { await app.vault.delete(file); deleted++; }
        }
      } else {
        await this._applyRemoteTask(app, rt, projectsFolder, localById);
        pulled++;
      }
    }

    // Persist the pull timestamp so next sync is a delta
    localStorage.setItem(LS_LAST_PULL, String(pulledAt));

    return { pushed, pulled, conflicts, deleted, conflictTasks: serverConflicts };
  }

  /**
   * Force-push local versions of conflicting tasks, overriding the server.
   *
   * For each task in `localTasks`, we bump `updatedAt` to `serverTs + 1` so it
   * is strictly newer than the server copy.  The server's "highest timestamp
   * wins" logic will then accept our version and propagate it to every other
   * client (e.g. the Flutter app) on their next pull.
   *
   * @param app            Obsidian App instance
   * @param projectsFolder Root folder for task .md files
   * @param conflictTasks  The raw server objects returned in `syncAll().conflictTasks`
   */
  async forcePushTasks(app: App, projectsFolder: string, conflictTasks: any[]): Promise<void> {
    if (conflictTasks.length === 0) return;

    // Reload local tasks to get the latest file content
    const projects  = await loadProjects(app, projectsFolder);
    const localById = new Map<string, Task>(
      ([] as Task[]).concat(...projects.map((p) => p.tasks)).map((t: Task) => [t.id, t])
    );

    const overrideTasks = await Promise.all(conflictTasks.map(async (rt: any) => {
      const local    = localById.get(rt.id);
      const serverTs = rt.updatedAt ?? 0;
      // Winning timestamp: strictly greater than the server's current value
      const winningTs = serverTs + 1;

      // Read the raw file content so the server stores the exact file
      let rawFrontmatter: string | null = null;
      if (local) {
        try {
          const file = app.vault.getFileByPath(local.filePath);
          if (file) {
            rawFrontmatter = await app.vault.read(file);
            // Stamp the winning timestamp into the raw content before pushing
            rawFrontmatter = rawFrontmatter
              .replace(/^(updated_at:\s*).*$/m, `$1${winningTs}`);
            if (!/^updated_at:/m.test(rawFrontmatter)) {
              rawFrontmatter = rawFrontmatter.replace(/\n---\n/, `\nupdated_at: ${winningTs}\n---\n`);
            }
            // Write the stamped content back to disk
            await app.vault.modify(file, rawFrontmatter);
          }
        } catch { rawFrontmatter = null; }
      }

      return {
        id:             rt.id,
        title:          local?.title          ?? rt.title,
        status:         local?.status         ?? rt.status,
        priority:       local?.priority       ?? rt.priority,
        start_date:     local?.startDate      ?? rt.startDate  ?? rt.start_date  ?? '',
        end_date:       local?.endDate        ?? rt.endDate    ?? rt.end_date    ?? '',
        assignee:       local?.assignee       ?? rt.assignee   ?? '',
        tags:           (local?.tags ?? []).join(','),
        description:    local?.description    ?? rt.description ?? '',
        project_folder: local?.projectFolder  ?? rt.project_folder ?? '',
        file_path:      local?.filePath       ?? rt.file_path  ?? '',
        updatedAt:      winningTs,        // beats the server — guaranteed win
        rawFrontmatter: rawFrontmatter,   // verbatim file so other clients get the full content
      };
    }));

    await this._fetch('/tasks/push', {
      method: 'POST',
      body: JSON.stringify({ tasks: overrideTasks }),
    });
  }

  /**
   * Write a remote task object into the vault as a .md file.
   * If a local file for this task already exists, update it in-place.
   *
   * Priority order for file content:
   *  1. `rt.rawFrontmatter` — the verbatim file content the originating client
   *     pushed to the server.  Using this preserves every field (assignee, tags,
   *     parent_id, description, notes body, etc.) regardless of which client
   *     created the task.
   *  2. Reconstructed from structured fields — fallback when rawFrontmatter is
   *     absent (e.g. tasks pushed by the Flutter app).
   */
  private async _applyRemoteTask(
    app: App,
    rt: any,
    projectsFolder: string,
    localById: Map<string, Task>,
  ): Promise<void> {
    const local = localById.get(rt.id);

    // Determine target path: reuse existing file path, or derive from server data
    let filePath: string;
    if (local?.filePath) {
      filePath = local.filePath;
    } else {
      const folder = rt.project_folder || `${projectsFolder}/Synced`;
      await app.vault.adapter.mkdir(folder).catch(() => {});
      const safeName = (rt.title ?? rt.id).replace(/[/\\:*?"<>|]/g, '_');
      filePath = `${folder}/${safeName}.md`;
    }

    // ── Build the new file content ──────────────────────────────────────────
    let newContent: string;

    if (rt.rawFrontmatter && typeof rt.rawFrontmatter === 'string' && rt.rawFrontmatter.startsWith('---')) {
      // Use the verbatim content from the server — this preserves every field
      // the originating client wrote (Obsidian snake_case keys, tags, notes, etc.)
      // Ensure updated_at in the raw content matches the server's authoritative ts
      newContent = rt.rawFrontmatter.replace(
        /^(updated_at:\s*).*$/m,
        `$1${rt.updatedAt ?? 0}`
      );
      // If updated_at wasn't in the frontmatter, inject it before the closing ---
      if (!/^updated_at:/m.test(newContent)) {
        newContent = newContent.replace(/\n---\n/, `\nupdated_at: ${rt.updatedAt ?? 0}\n---\n`);
      }
    } else {
      // Fallback: reconstruct from structured fields (e.g. Flutter-pushed tasks)
      const reconstructed = generateTaskFrontmatter({
        id:          rt.id,
        title:       rt.title,
        status:      rt.status,
        priority:    rt.priority,
        startDate:   rt.startDate  ?? rt.start_date  ?? '',
        endDate:     rt.endDate    ?? rt.end_date    ?? '',
        assignee:    rt.assignee   ?? '',
        tags:        rt.tags
          ? (typeof rt.tags === 'string'
              ? rt.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
              : rt.tags)
          : [],
        description: rt.description ?? '',
        parentId:    rt.parentId   ?? rt.parent_id   ?? '',
        updatedAt:   rt.updatedAt  ?? 0,
      });

      // Preserve the existing body (Description / Notes sections) if file exists
      const existingFile = app.vault.getFileByPath(filePath);
      if (existingFile) {
        const oldContent = await app.vault.read(existingFile);
        const bodyMatch  = oldContent.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
        const body       = bodyMatch ? bodyMatch[1] : '';
        // Strip any body that was baked into the reconstructed frontmatter string,
        // then append the preserved body
        const fmOnly = reconstructed.replace(/\n---\n[\s\S]*$/, '\n---\n');
        newContent = fmOnly + (body.startsWith('\n') ? body.slice(1) : body);
      } else {
        newContent = reconstructed;
      }
    }

    // ── Write to vault ──────────────────────────────────────────────────────
    const existingFile = app.vault.getFileByPath(filePath);
    if (existingFile) {
      await app.vault.modify(existingFile, newContent);
    } else {
      await app.vault.create(filePath, newContent);
    }
  }
}
