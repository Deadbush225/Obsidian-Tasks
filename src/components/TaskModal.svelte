<script lang="ts">
  import type { Task, TaskStatus, TaskPriority } from '../types';

  export let parentId: string | null = null;
  export let parentTitle: string = '';
  export let onSubmit: (data: {
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    startDate: string;
    endDate: string;
    assignee: string;
    tags: string;
    description: string;
  }) => void = () => {};
  export let onCancel: () => void = () => {};

  let title = '';
  let status: TaskStatus = 'todo';
  let priority: TaskPriority = 'medium';
  let startDate = '';
  let endDate = '';
  let assignee = '';
  let tags = '';
  let description = '';

  let errors: Record<string, string> = {};

  function validate(): boolean {
    errors = {};
    if (!title.trim()) errors.title = 'Title is required';
    if (startDate && endDate && endDate < startDate) {
      errors.endDate = 'End date must be after start date';
    }
    return Object.keys(errors).length === 0;
  }

  function submit() {
    if (!validate()) return;
    onSubmit({ title: title.trim(), status, priority, startDate, endDate, assignee, tags, description });
  }
</script>

<div
  class="task-modal-overlay"
  on:click|self={onCancel}
  on:keydown={(e) => e.key === 'Escape' && onCancel()}
  role="dialog"
  aria-modal="true"
  tabindex="-1"
>
  <div class="task-modal">
    <div class="modal-header">
      <h2>{parentId ? `New Subtask` : 'New Task'}</h2>
      {#if parentId}
        <span class="parent-label">under: {parentTitle}</span>
      {/if}
      <button class="close-btn" on:click={onCancel} aria-label="Close">✕</button>
    </div>

    <div class="modal-body">
      <div class="form-row">
        <label for="task-title">Title <span class="required">*</span></label>
        <input
          id="task-title"
          bind:value={title}
          placeholder="Task title..."
          class:error={errors.title}
          on:keydown={(e) => e.key === 'Enter' && submit()}
        />
        {#if errors.title}<span class="error-msg">{errors.title}</span>{/if}
      </div>

      <div class="form-row-inline">
        <div class="form-row">
          <label for="task-status">Status</label>
          <select id="task-status" bind:value={status}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div class="form-row">
          <label for="task-priority">Priority</label>
          <select id="task-priority" bind:value={priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div class="form-row-inline">
        <div class="form-row">
          <label for="task-start">Start date</label>
          <input id="task-start" type="date" bind:value={startDate} />
        </div>

        <div class="form-row">
          <label for="task-end">End date</label>
          <input
            id="task-end"
            type="date"
            bind:value={endDate}
            class:error={errors.endDate}
          />
          {#if errors.endDate}<span class="error-msg">{errors.endDate}</span>{/if}
        </div>
      </div>

      <div class="form-row">
        <label for="task-assignee">Assignee</label>
        <input id="task-assignee" bind:value={assignee} placeholder="@name" />
      </div>

      <div class="form-row">
        <label for="task-tags">Tags <span class="hint">(comma separated)</span></label>
        <input id="task-tags" bind:value={tags} placeholder="design, backend, urgent" />
      </div>

      <div class="form-row">
        <label for="task-desc">Description</label>
        <textarea id="task-desc" bind:value={description} rows="3" placeholder="Optional description..."></textarea>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn-secondary" on:click={onCancel}>Cancel</button>
      <button class="btn-primary" on:click={submit}>
        {parentId ? 'Create Subtask' : 'Create Task'}
      </button>
    </div>
  </div>
</div>

<style>
  .task-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .task-modal {
    background: var(--background-primary);
    border: 1px solid var(--background-modifier-border);
    border-radius: 10px;
    width: 480px;
    max-width: 95vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--background-modifier-border);
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.1em;
    flex: 1;
  }

  .parent-label {
    font-size: 0.8em;
    color: var(--text-muted);
    background: var(--background-secondary);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 1.1em;
    padding: 4px;
    border-radius: 4px;
  }

  .close-btn:hover {
    color: var(--text-normal);
    background: var(--background-modifier-hover);
  }

  .modal-body {
    padding: 16px 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .form-row-inline {
    display: flex;
    gap: 12px;
  }

  label {
    font-size: 0.82em;
    font-weight: 600;
    color: var(--text-muted);
  }

  input, select, textarea {
    background: var(--background-secondary);
    border: 1px solid var(--background-modifier-border);
    border-radius: 5px;
    padding: 6px 10px;
    color: var(--text-normal);
    font-size: 0.9em;
    width: 100%;
    box-sizing: border-box;
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: var(--interactive-accent);
  }

  input.error {
    border-color: var(--color-red);
  }

  textarea {
    resize: vertical;
    min-height: 60px;
    font-family: inherit;
  }

  .error-msg {
    font-size: 0.78em;
    color: var(--color-red);
  }

  .required {
    color: var(--color-red);
  }

  .hint {
    font-weight: 400;
    font-size: 0.9em;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 14px 20px;
    border-top: 1px solid var(--background-modifier-border);
  }

  .btn-primary {
    background: var(--interactive-accent);
    color: var(--text-on-accent);
    border: none;
    border-radius: 5px;
    padding: 7px 18px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9em;
  }

  .btn-primary:hover {
    filter: brightness(1.1);
  }

  .btn-secondary {
    background: var(--background-secondary);
    color: var(--text-normal);
    border: 1px solid var(--background-modifier-border);
    border-radius: 5px;
    padding: 7px 18px;
    cursor: pointer;
    font-size: 0.9em;
  }

  .btn-secondary:hover {
    background: var(--background-modifier-hover);
  }
</style>
