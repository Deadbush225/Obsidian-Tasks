<script lang="ts">
  import type { Task, Subtask, TaskStatus } from '../types';

  export let tasks: Task[] = [];
  export let onOpenTask: (filePath: string) => void = () => {};
  export let onStatusChange: (taskId: string, newStatus: TaskStatus) => void = () => {};
  export let onAddSubtask: (parentId: string, parentTitle: string) => void = () => {};

  type Column = { id: TaskStatus; label: string; color: string; };
  const columns: Column[] = [
    { id: 'todo',        label: '📋 To Do',      color: 'var(--color-base-30)' },
    { id: 'in-progress', label: '🔄 In Progress', color: 'var(--color-yellow)' },
    { id: 'blocked',     label: '🚫 Blocked',     color: 'var(--color-red)' },
    { id: 'done',        label: '✅ Done',         color: 'var(--color-green)' },
  ];

  // ─── Flat card model ────────────────────────────────────────────────────────
  type KanbanCard = {
    id: string;
    title: string;
    status: TaskStatus;
    priority: string;
    startDate: string | null;
    endDate: string | null;
    tags: string[];
    filePath: string;
    isSubtask: boolean;
    parentId: string;      // id of parent task (empty string for top-level)
    parentTitle: string;
    accentColor: string;
    subtaskCount: number;
    subtaskDone: number;
  };

  const PALETTE = [
    '#7c6af7', '#f7926a', '#6bbff7', '#f7c86a', '#6af79e',
    '#f76a9e', '#6af7f0', '#c86af7', '#f7f06a', '#6a9ef7',
  ];

  $: cards = buildCards(tasks);

  // Per-column card lists — reactive `$:` so Svelte re-renders the moment
  // either `cards` (from tasks prop) or `statusOverrides` (from a drop) changes.
  let statusOverrides: Record<string, TaskStatus> = {};

  $: colCards = computeColCards(cards, statusOverrides);

  function computeColCards(
    cards: KanbanCard[],
    overrides: Record<string, TaskStatus>
  ): Record<TaskStatus, KanbanCard[]> {
    const result: Record<TaskStatus, KanbanCard[]> = {
      'todo': [], 'in-progress': [], 'blocked': [], 'done': [],
    };
    for (const c of cards) {
      const status = (c.id in overrides ? overrides[c.id] : c.status) as TaskStatus;
      result[status].push({ ...c, status });
    }
    return result;
  }

  // When tasks prop updates from disk, drop overrides that are now satisfied.
  $: if (tasks) {
    const settled = Object.keys(statusOverrides).filter(id => {
      const card = cards.find(c => c.id === id);
      return card && card.status === statusOverrides[id];
    });
    if (settled.length > 0) {
      const next = { ...statusOverrides };
      for (const id of settled) delete next[id];
      statusOverrides = next;
    }
  }

  function buildCards(tasks: Task[]): KanbanCard[] {
    const result: KanbanCard[] = [];
    tasks.forEach((task, taskIdx) => {
      const parentColor = PALETTE[taskIdx % PALETTE.length];
      result.push({
        id: task.id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        endDate: task.endDate,
        tags: task.tags,
        filePath: task.filePath,
        isSubtask: false,
        parentId: '',
        parentTitle: '',
        accentColor: parentColor,
        subtaskCount: task.subtasks.length,
        subtaskDone: task.subtasks.filter(s => s.status === 'done').length,
      });
      for (const sub of task.subtasks) {
        result.push({
          id: sub.id,
          title: sub.title,
          status: sub.status,
          priority: sub.priority ?? task.priority,
          startDate: sub.startDate,
          endDate: sub.endDate,
          tags: [],
          filePath: sub.filePath,
          isSubtask: true,
          parentId: task.id,
          parentTitle: task.title,
          accentColor: parentColor,
          subtaskCount: 0,
          subtaskDone: 0,
        });
      }
    });
    return result;
  }

  // ─── Drag & Drop ─────────────────────────────────────────────────────────────
  // Use a counter per column (dragenter/dragleave are unreliable with children).
  let draggingId: string | null = null;
  let dragOverCol: TaskStatus | null = null;
  const dragCounters: Map<TaskStatus, number> = new Map();

  function onDragStart(card: KanbanCard, e: DragEvent) {
    draggingId = card.id;
    e.dataTransfer!.setData('text/plain', card.id);
    e.dataTransfer!.effectAllowed = 'move';
  }

  function onDragEnd() {
    draggingId = null;
    dragOverCol = null;
    dragCounters.clear();
  }

  function onDragEnter(colId: TaskStatus, e: DragEvent) {
    e.preventDefault();
    const n = (dragCounters.get(colId) ?? 0) + 1;
    dragCounters.set(colId, n);
    dragOverCol = colId;
  }

  function onDragOver(colId: TaskStatus, e: DragEvent) {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
  }

  function onDragLeave(colId: TaskStatus) {
    const n = Math.max(0, (dragCounters.get(colId) ?? 1) - 1);
    dragCounters.set(colId, n);
    if (n === 0 && dragOverCol === colId) dragOverCol = null;
  }

  function onDrop(colId: TaskStatus, e: DragEvent) {
    e.preventDefault();
    if (draggingId) {
      // New object reference → Svelte detects the change and re-renders immediately
      statusOverrides = { ...statusOverrides, [draggingId]: colId };
      // Persist to disk asynchronously
      onStatusChange(draggingId, colId);
    }
    draggingId = null;
    dragOverCol = null;
    dragCounters.set(colId, 0);
  }

  // ─── Priority badge ─────────────────────────────────────────────────────────
  const priorityColors: Record<string, string> = {
    low: '#6bb6ff', medium: '#ffcd5e', high: '#ff8c42', critical: '#e84040',
  };
  const priorityLabel = (p: string) => p.charAt(0).toUpperCase() + p.slice(1);
</script>

<div class="kanban-board">
  {#each columns as col}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="kanban-column"
      class:drag-over={dragOverCol === col.id}
      on:dragenter={(e) => onDragEnter(col.id, e)}
      on:dragover={(e) => onDragOver(col.id, e)}
      on:dragleave={() => onDragLeave(col.id)}
      on:drop={(e) => onDrop(col.id, e)}
      role="list"
    >
      <div class="kanban-col-header" style="border-top: 3px solid {col.color}">
        <span class="col-title">{col.label}</span>
        <span class="col-count">{colCards[col.id].length}</span>
      </div>

      <div class="kanban-cards">
        {#each colCards[col.id] as card (card.id)}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="kanban-card"
            class:dragging={draggingId === card.id}
            class:is-subtask={card.isSubtask}
            draggable="true"
            style="border-left-color: {card.accentColor}"
            on:dragstart={(e) => onDragStart(card, e)}
            on:dragend={onDragEnd}
            role="listitem"
          >
            <!-- Subtask breadcrumb -->
            {#if card.isSubtask}
              <div class="card-parent-label">
                <span class="parent-dot" style="background:{card.accentColor}"></span>
                {card.parentTitle}
              </div>
            {/if}

            <div class="card-header">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span
                class="card-title"
                on:click={() => onOpenTask(card.filePath)}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && onOpenTask(card.filePath)}
              >{card.title}</span>
              <span class="priority-badge" style="background:{priorityColors[card.priority] ?? '#888'}">
                {priorityLabel(card.priority)}
              </span>
            </div>

            {#if card.tags.length > 0}
              <div class="card-tags">
                {#each card.tags as tag}
                  <span class="tag">#{tag}</span>
                {/each}
              </div>
            {/if}

            {#if card.subtaskCount > 0}
              <div class="card-subtasks">
                <span class="subtask-count">{card.subtaskDone}/{card.subtaskCount} subtasks</span>
                <div class="subtask-progress">
                  <div class="subtask-fill" style="width:{(card.subtaskDone/card.subtaskCount)*100}%"></div>
                </div>
              </div>
            {/if}

            {#if card.startDate || card.endDate}
              <div class="card-dates">
                {#if card.startDate}<span>📅 {card.startDate}</span>{/if}
                {#if card.endDate}<span>→ {card.endDate}</span>{/if}
              </div>
            {/if}

            <!-- Add subtask button — only on parent cards -->
            {#if !card.isSubtask}
              <div class="card-footer">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <button
                  class="btn-add-subtask"
                  on:click|stopPropagation={() => onAddSubtask(card.id, card.title)}
                  title="Add subtask"
                >+ Subtask</button>
              </div>
            {/if}
          </div>
        {/each}

        {#if colCards[col.id].length === 0}
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
    box-sizing: border-box;
  }

  .kanban-column {
    flex: 0 0 270px;
    background: var(--background-secondary);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 100px);
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
    flex-shrink: 0;
  }

  .col-title { font-weight: 600; font-size: 0.9em; }

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
    /* Left accent border comes from inline border-left-color; width/style set here */
    border-top: 1px solid var(--background-modifier-border);
    border-right: 1px solid var(--background-modifier-border);
    border-bottom: 1px solid var(--background-modifier-border);
    border-left-width: 4px;
    border-left-style: solid;
    border-radius: 6px;
    padding: 10px 12px;
    cursor: grab;
    transition: box-shadow 0.15s, opacity 0.15s;
  }

  .kanban-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
  .kanban-card.dragging { opacity: 0.35; cursor: grabbing; }

  .kanban-card.is-subtask {
    background: color-mix(in srgb, var(--background-primary) 85%, var(--background-secondary) 15%);
  }

  .card-parent-label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.73em;
    color: var(--text-muted);
    margin-bottom: 5px;
    font-style: italic;
  }

  .parent-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
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
  .card-title:hover { text-decoration: underline; }

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

  .card-subtasks { margin-top: 8px; }
  .subtask-count { font-size: 0.75em; color: var(--text-muted); }

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

  .card-footer {
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
  }

  .btn-add-subtask {
    font-size: 0.72em;
    padding: 2px 8px;
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: background 0.1s, color 0.1s;
  }
  .btn-add-subtask:hover {
    background: var(--interactive-accent);
    color: var(--text-on-accent);
    border-color: var(--interactive-accent);
  }

  .kanban-empty {
    color: var(--text-faint);
    font-size: 0.85em;
    text-align: center;
    padding: 24px 8px;
    border: 1px dashed var(--background-modifier-border);
    border-radius: 6px;
  }
</style>
