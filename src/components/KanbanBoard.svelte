<script lang="ts">
  import type { Task, TaskStatus } from '../types';

  export let tasks: Task[] = [];
  export let onOpenTask: (filePath: string) => void = () => {};
  export let onStatusChange: (taskId: string, newStatus: TaskStatus) => void = () => {};

  type Column = {
    id: TaskStatus;
    label: string;
    color: string;
  };

  const columns: Column[] = [
    { id: 'todo',        label: '📋 To Do',       color: 'var(--color-base-30)' },
    { id: 'in-progress', label: '🔄 In Progress',  color: 'var(--color-yellow)' },
    { id: 'blocked',     label: '🚫 Blocked',      color: 'var(--color-red)' },
    { id: 'done',        label: '✅ Done',          color: 'var(--color-green)' },
  ];

  function getTasksForColumn(status: TaskStatus): Task[] {
    return tasks.filter(t => t.status === status);
  }

  // ─── Drag & Drop ───────────────────────────────────────────────────────────
  let draggingId: string | null = null;
  let dragOverCol: TaskStatus | null = null;

  function onDragStart(task: Task, e: DragEvent) {
    draggingId = task.id;
    e.dataTransfer?.setData('text/plain', task.id);
  }

  function onDragOver(colId: TaskStatus, e: DragEvent) {
    e.preventDefault();
    dragOverCol = colId;
  }

  function onDrop(colId: TaskStatus, e: DragEvent) {
    e.preventDefault();
    if (draggingId) {
      onStatusChange(draggingId, colId);
      draggingId = null;
      dragOverCol = null;
    }
  }

  function onDragLeave() {
    dragOverCol = null;
  }

  // ─── Priority badge ─────────────────────────────────────────────────────────
  const priorityColors: Record<string, string> = {
    low: '#6bb6ff',
    medium: '#ffcd5e',
    high: '#ff8c42',
    critical: '#e84040',
  };

  function priorityLabel(p: string) {
    return p.charAt(0).toUpperCase() + p.slice(1);
  }
</script>

<div class="kanban-board">
  {#each columns as col}
    <div
      class="kanban-column"
      class:drag-over={dragOverCol === col.id}
      on:dragover={(e) => onDragOver(col.id, e)}
      on:drop={(e) => onDrop(col.id, e)}
      on:dragleave={onDragLeave}
      role="list"
    >
      <div class="kanban-col-header" style="border-top: 3px solid {col.color}">
        <span class="col-title">{col.label}</span>
        <span class="col-count">{getTasksForColumn(col.id).length}</span>
      </div>

      <div class="kanban-cards">
        {#each getTasksForColumn(col.id) as task (task.id)}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="kanban-card"
            class:dragging={draggingId === task.id}
            draggable="true"
            on:dragstart={(e) => onDragStart(task, e)}
          >
            <div class="card-header">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span
                class="card-title"
                on:click={() => onOpenTask(task.filePath)}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && onOpenTask(task.filePath)}
              >
                {task.title}
              </span>
              <span
                class="priority-badge"
                style="background:{priorityColors[task.priority] ?? '#888'}"
              >
                {priorityLabel(task.priority)}
              </span>
            </div>

            {#if task.tags.length > 0}
              <div class="card-tags">
                {#each task.tags as tag}
                  <span class="tag">#{tag}</span>
                {/each}
              </div>
            {/if}

            {#if task.subtasks.length > 0}
              <div class="card-subtasks">
                <span class="subtask-count">
                  {task.subtasks.filter(s => s.status === 'done').length}/{task.subtasks.length} subtasks
                </span>
                <div class="subtask-progress">
                  <div
                    class="subtask-fill"
                    style="width:{(task.subtasks.filter(s=>s.status==='done').length/task.subtasks.length)*100}%"
                  ></div>
                </div>
              </div>
            {/if}

            {#if task.startDate || task.endDate}
              <div class="card-dates">
                {#if task.startDate}<span>📅 {task.startDate}</span>{/if}
                {#if task.endDate}<span>→ {task.endDate}</span>{/if}
              </div>
            {/if}

            <!-- Sub-task expand -->
            {#if task.subtasks.length > 0}
              <details class="subtask-list">
                <summary>Subtasks</summary>
                {#each task.subtasks as sub}
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <div
                    class="subtask-item"
                    role="button"
                    tabindex="0"
                    on:click={() => onOpenTask(sub.filePath)}
                    on:keydown={(e) => e.key === 'Enter' && onOpenTask(sub.filePath)}
                  >
                    <span class="subtask-status status-{sub.status}">●</span>
                    <span>{sub.title}</span>
                  </div>
                {/each}
              </details>
            {/if}
          </div>
        {/each}

        {#if getTasksForColumn(col.id).length === 0}
          <div class="kanban-empty">Drop tasks here</div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .kanban-board {
    display: flex;
    gap: 12px;
    padding: 16px;
    height: 100%;
    overflow-x: auto;
    align-items: flex-start;
  }

  .kanban-column {
    flex: 0 0 260px;
    background: var(--background-secondary);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 120px);
    transition: box-shadow 0.15s;
  }

  .kanban-column.drag-over {
    box-shadow: 0 0 0 2px var(--interactive-accent);
  }

  .kanban-col-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px 8px;
    border-radius: 8px 8px 0 0;
  }

  .col-title {
    font-weight: 600;
    font-size: 0.9em;
  }

  .col-count {
    background: var(--background-modifier-border);
    border-radius: 10px;
    padding: 1px 8px;
    font-size: 0.8em;
    font-weight: 600;
  }

  .kanban-cards {
    padding: 8px;
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .kanban-card {
    background: var(--background-primary);
    border: 1px solid var(--background-modifier-border);
    border-radius: 6px;
    padding: 10px 12px;
    cursor: grab;
    transition: box-shadow 0.15s, opacity 0.15s;
  }

  .kanban-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .kanban-card.dragging {
    opacity: 0.4;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 6px;
  }

  .card-title {
    font-weight: 500;
    font-size: 0.9em;
    cursor: pointer;
    color: var(--text-accent);
    flex: 1;
    line-height: 1.3;
  }

  .card-title:hover {
    text-decoration: underline;
  }

  .priority-badge {
    font-size: 0.7em;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    color: #000;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .card-tags {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tag {
    font-size: 0.75em;
    background: var(--background-modifier-border);
    border-radius: 4px;
    padding: 1px 5px;
    color: var(--text-muted);
  }

  .card-subtasks {
    margin-top: 8px;
  }

  .subtask-count {
    font-size: 0.75em;
    color: var(--text-muted);
  }

  .subtask-progress {
    height: 4px;
    background: var(--background-modifier-border);
    border-radius: 2px;
    margin-top: 3px;
  }

  .subtask-fill {
    height: 100%;
    background: var(--color-green);
    border-radius: 2px;
    transition: width 0.3s;
  }

  .card-dates {
    margin-top: 6px;
    font-size: 0.75em;
    color: var(--text-muted);
    display: flex;
    gap: 6px;
  }

  .subtask-list {
    margin-top: 8px;
    font-size: 0.82em;
  }

  .subtask-list summary {
    cursor: pointer;
    color: var(--text-muted);
    user-select: none;
  }

  .subtask-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 4px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 2px;
  }

  .subtask-item:hover {
    background: var(--background-modifier-hover);
  }

  .subtask-status {
    font-size: 0.7em;
  }

  .status-todo        { color: var(--text-muted); }
  .status-in-progress { color: var(--color-yellow); }
  .status-done        { color: var(--color-green); }
  .status-blocked     { color: var(--color-red); }

  .kanban-empty {
    color: var(--text-faint);
    font-size: 0.85em;
    text-align: center;
    padding: 24px 8px;
    border: 1px dashed var(--background-modifier-border);
    border-radius: 6px;
  }
</style>
