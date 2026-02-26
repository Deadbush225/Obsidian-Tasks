<?php
/**
 * Tasks.php  —  Server-side sync store for Gantt tasks
 *
 * Conflict resolution strategy
 * ─────────────────────────────
 * Each task carries an `updated_at` field (unix milliseconds, set by the
 * client at the moment the task was last modified locally).
 *
 * PUSH  (client → server):
 *   For every task in the payload the server compares the incoming
 *   `updated_at` with the stored `updated_at`:
 *     • incoming > stored  → server row is overwritten  (client wins)
 *     • incoming < stored  → server row is NOT changed  (server wins)
 *                            the server task is included in the response
 *                            under "conflicts" so the client can update
 *                            its local copy
 *     • incoming == stored → no-op (identical, nothing to do)
 *   New tasks (not yet in DB) are always inserted.
 *
 * PULL  (server → client):
 *   Returns every task whose `updated_at` is strictly greater than the
 *   caller-supplied `since` timestamp (unix millis).  The client merges
 *   these into local state using the same "higher timestamp wins" rule.
 *
 * This gives lightweight optimistic concurrency without needing vector
 * clocks or three-way merge — good enough for a single-user / personal
 * task tracker.
 */
class Tasks {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // ── helpers ───────────────────────────────────────────────────────────────

    private function row2task(array $row): array {
        return [
            'id'              => $row['id'],
            'title'           => $row['title'],
            'status'          => $row['status'],
            'priority'        => $row['priority'],
            'startDate'       => $row['start_date'],
            'endDate'         => $row['end_date'],
            'rawFrontmatter'  => $row['raw_frontmatter'],
            'isArchived'      => (bool)$row['is_archived'],
            'updatedAt'       => (int)$row['updated_at'],
            'serverTime'      => $row['server_time'],
        ];
    }

    private function log(int $userId, string $taskId, string $action,
                         ?int $clientTs, ?int $serverTs): void {
        try {
            $stmt = $this->pdo->prepare(
                "INSERT INTO gantt_sync_log (user_id, task_id, action, client_ts, server_ts)
                 VALUES (?, ?, ?, ?, ?)"
            );
            $stmt->execute([$userId, $taskId, $action, $clientTs, $serverTs]);
        } catch (Exception $e) {
            error_log("gantt_sync_log write failed: " . $e->getMessage());
        }
    }

    // ── public API ────────────────────────────────────────────────────────────

    /**
     * PULL — return all tasks updated since `$since` (unix millis).
     * Pass 0 to get everything (initial full sync).
     */
    public function pull(int $userId, int $since): array {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM gantt_tasks
             WHERE user_id = ? AND updated_at > ?
             ORDER BY updated_at ASC"
        );
        $stmt->execute([$userId, $since]);
        $rows = $stmt->fetchAll();

        foreach ($rows as $row) {
            $this->log($userId, $row['id'], 'pull', null, (int)$row['updated_at']);
        }

        return [
            'tasks'     => array_map([$this, 'row2task'], $rows),
            'pulledAt'  => $this->nowMillis(),
        ];
    }

    /**
     * PUSH — upsert a batch of tasks from the client.
     * Returns:
     *   accepted  — task IDs that were written to the server
     *   conflicts — full task objects the server already has with a
     *               newer timestamp (client should adopt these)
     */
    public function push(int $userId, array $tasks): array {
        $accepted  = [];
        $conflicts = [];

        foreach ($tasks as $t) {
            $id         = trim($t['id']             ?? '');
            $clientTs   = (int)($t['updatedAt']     ?? 0);

            if ($id === '') continue;

            // Fetch existing row
            $stmt = $this->pdo->prepare(
                "SELECT updated_at FROM gantt_tasks WHERE id = ? AND user_id = ?"
            );
            $stmt->execute([$id, $userId]);
            $existing = $stmt->fetch();

            if ($existing === false) {
                // Brand-new task — always insert
                $this->upsert($userId, $t);
                $accepted[] = $id;
                $this->log($userId, $id, 'push', $clientTs, null);

            } elseif ($clientTs > (int)$existing['updated_at']) {
                // Client is newer — overwrite
                $this->upsert($userId, $t);
                $accepted[] = $id;
                $this->log($userId, $id, 'push', $clientTs, (int)$existing['updated_at']);

            } elseif ($clientTs < (int)$existing['updated_at']) {
                // Server is newer — send server copy back as conflict
                $full = $this->pdo->prepare(
                    "SELECT * FROM gantt_tasks WHERE id = ? AND user_id = ?"
                );
                $full->execute([$id, $userId]);
                $row = $full->fetch();
                $conflicts[] = $this->row2task($row);
                $this->log($userId, $id, 'conflict_server_win', $clientTs, (int)$existing['updated_at']);

            }
            // equal timestamps → no-op
        }

        return [
            'accepted'  => $accepted,
            'conflicts' => $conflicts,
            'pushedAt'  => $this->nowMillis(),
        ];
    }

    /**
     * DELETE (soft-archive) a single task.
     * Sets is_archived = 1 and bumps updated_at to "now" so future pulls
     * propagate the deletion to other devices.
     */
    public function archive(int $userId, string $taskId): array {
        $stmt = $this->pdo->prepare(
            "UPDATE gantt_tasks
             SET is_archived = 1, updated_at = ?, server_time = CURRENT_TIMESTAMP
             WHERE id = ? AND user_id = ?"
        );
        $stmt->execute([$this->nowMillis(), $taskId, $userId]);

        if ($stmt->rowCount() === 0) {
            throw new Exception("Task not found", 404);
        }

        $this->log($userId, $taskId, 'push', null, $this->nowMillis());
        return ['msg' => 'archived', 'id' => $taskId];
    }

    /**
     * LIST — simple flat list of all non-archived tasks (no delta).
     * Useful for a cold start display before the local markdown is scanned.
     */
    public function list(int $userId): array {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM gantt_tasks
             WHERE user_id = ? AND is_archived = 0
             ORDER BY COALESCE(end_date, '9999-12-31') ASC"
        );
        $stmt->execute([$userId]);
        return array_map([$this, 'row2task'], $stmt->fetchAll());
    }

    // ── private helpers ───────────────────────────────────────────────────────

    private function upsert(int $userId, array $t): void {
        $stmt = $this->pdo->prepare(
            "INSERT INTO gantt_tasks
                 (id, user_id, title, status, priority, start_date, end_date,
                  raw_frontmatter, is_archived, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                 title           = VALUES(title),
                 status          = VALUES(status),
                 priority        = VALUES(priority),
                 start_date      = VALUES(start_date),
                 end_date        = VALUES(end_date),
                 raw_frontmatter = VALUES(raw_frontmatter),
                 is_archived     = VALUES(is_archived),
                 updated_at      = VALUES(updated_at),
                 server_time     = CURRENT_TIMESTAMP"
        );

        $stmt->execute([
            $t['id'],
            $userId,
            substr($t['title']           ?? '', 0, 500),
            substr($t['status']          ?? 'todo', 0, 50),
            substr($t['priority']        ?? 'medium', 0, 50),
            $this->safeDate($t['startDate'] ?? $t['start_date'] ?? null),
            $this->safeDate($t['endDate']   ?? $t['end_date']   ?? null),
            $t['rawFrontmatter'] ?? $t['raw_frontmatter'] ?? null,
            empty($t['isArchived']) && empty($t['is_archived']) ? 0 : 1,
            (int)($t['updatedAt'] ?? $t['updated_at'] ?? 0),
        ]);
    }

    private function safeDate(?string $s): ?string {
        if ($s === null || $s === '') return null;
        // accept YYYY-MM-DD only
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) return $s;
        return null;
    }

    private function nowMillis(): int {
        return (int)(microtime(true) * 1000);
    }
}
