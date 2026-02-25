<script lang="ts">
  import type { Project, Task, TaskStatus } from '../types';
  import KanbanBoard from './KanbanBoard.svelte';
  import GanttChart from './GanttChart.svelte';
  import TaskModal from './TaskModal.svelte';

  // ─── Props ──────────────────────────────────────────────────────────────────
  // Initial data + stable callbacks — never re-passed from outside after mount
  export let projects: Project[] = [];
  export let activeProjectIndex: number = 0;
  export let viewMode: 'gantt' | 'kanban' = 'gantt';

  export let onCreateTask: (
    projectFolder: string,
    title: string,
    parentId: string | null,
    extra: Partial<Task>
  ) => Promise<void>;

  export let onStatusChange: (
    projectFolder: string,
    taskId: string,
    newStatus: TaskStatus
  ) => Promise<void>;

  export let onDateChange: (
    projectFolder: string,
    taskId: string,
    startDate: string,
    endDate: string
  ) => Promise<void>;

  export let onArchiveTask: (
    projectFolder: string,
    taskId: string,
    taskFilePath: string,
    isSubtask: boolean
  ) => Promise<void>;

  export let onOpenTask: (filePath: string) => void;
  // loadProjects: called by the component itself to get fresh data
  export let loadProjectsFn: () => Promise<Project[]> = async () => [];
  export let onViewModeChange: (mode: 'gantt' | 'kanban') => void = () => {};
  export let onActiveProjectChange: (idx: number) => void = () => {};

  // ─── Internal reactive state ────────────────────────────────────────────────
  // `liveProjects` is owned by this component — mutating it triggers Svelte re-renders
  let liveProjects: Project[] = projects;
  let loading = false;

  export async function refresh() {
    loading = true;
    try {
      liveProjects = await loadProjectsFn();
    } finally {
      loading = false;
    }
  }

  function setViewMode(mode: 'gantt' | 'kanban') {
    viewMode = mode;
    onViewModeChange(mode);
  }

  function setActiveProject(idx: number) {
    activeProjectIndex = idx;
    onActiveProjectChange(idx);
  }

  // ─── Modal state ────────────────────────────────────────────────────────────
  let showModal = false;
  let modalParentId: string | null = null;
  let modalParentTitle = '';

  function openNewTaskModal(parentId: string | null = null, parentTitle = '') {
    modalParentId = parentId;
    modalParentTitle = parentTitle;
    showModal = true;
  }

  async function handleModalSubmit(data: any) {
    showModal = false;
    const project = liveProjects[activeProjectIndex];
    if (!project) return;

    await onCreateTask(project.folderPath, data.title, modalParentId, {
      status: data.status,
      priority: data.priority,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      assignee: data.assignee,
      tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      description: data.description,
    });
    await refresh();
  }

  async function handleStatusChange(projectFolder: string, taskId: string, newStatus: TaskStatus) {
    // Optimistic update — mutate liveProjects in-memory immediately
    liveProjects = liveProjects.map(proj => ({
      ...proj,
      tasks: proj.tasks.map(task => {
        if (task.id === taskId) return { ...task, status: newStatus };
        return {
          ...task,
          subtasks: task.subtasks.map(sub =>
            sub.id === taskId ? { ...sub, status: newStatus } : sub
          ),
        };
      }),
    }));
    // Persist to disk
    await onStatusChange(projectFolder, taskId, newStatus);
    // Sync from disk to pick up any side-effects
    await refresh();
  }

  async function handleDateChange(
    projectFolder: string, taskId: string, startDate: string, endDate: string
  ) {
    // Optimistic update
    liveProjects = liveProjects.map(proj => ({
      ...proj,
      tasks: proj.tasks.map(task => {
        if (task.id === taskId) return { ...task, startDate, endDate };
        return {
          ...task,
          subtasks: task.subtasks.map(sub =>
            sub.id === taskId ? { ...sub, startDate, endDate } : sub
          ),
        };
      }),
    }));
    // Persist
    await onDateChange(projectFolder, taskId, startDate, endDate);
    await refresh();
  }

  async function handleArchiveTask(
    projectFolder: string,
    taskId: string,
    taskFilePath: string,
    isSubtask: boolean
  ) {
    // Optimistic: remove the task/subtask from liveProjects immediately
    liveProjects = liveProjects.map(proj => ({
      ...proj,
      tasks: proj.tasks
        .filter(task => task.id !== taskId)
        .map(task => ({
          ...task,
          subtasks: task.subtasks.filter(sub => sub.id !== taskId),
        })),
    }));
    await onArchiveTask(projectFolder, taskId, taskFilePath, isSubtask);
    await refresh();
  }

  $: currentProject = liveProjects[activeProjectIndex] ?? null;
  $: currentTasks = currentProject?.tasks ?? [];
</script>

<div class="project-view">
  <!-- ── Top bar ──────────────────────────────────────────────────────────── -->
  <div class="topbar">
    <!-- Project selector -->
    <div class="project-selector">
      <span class="topbar-label">Project:</span>
      {#each liveProjects as proj, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button
          class="project-tab"
          class:active={i === activeProjectIndex}
          on:click={() => setActiveProject(i)}
        >
          📁 {proj.name}
        </button>
      {/each}
      {#if liveProjects.length === 0}
        <span class="no-projects">No projects found in your projects folder.</span>
      {/if}
    </div>

    <!-- View switcher -->
    <div class="view-switcher">
      <button
        class="view-btn"
        class:active={viewMode === 'gantt'}
        on:click={() => setViewMode('gantt')}
        title="Gantt Chart"
      >
        📊 Gantt
      </button>
      <button
        class="view-btn"
        class:active={viewMode === 'kanban'}
        on:click={() => setViewMode('kanban')}
        title="Kanban Board"
      >
        🗂 Kanban
      </button>
    </div>

    <!-- Actions -->
    <div class="topbar-actions">
      {#if currentProject}
        <button class="btn-add" on:click={() => openNewTaskModal(null)}>
          + New Task
        </button>
      {/if}
      <button class="btn-refresh" class:spinning={loading} on:click={refresh} title="Refresh">↺</button>
    </div>
  </div>

  <!-- ── Main content ────────────────────────────────────────────────────── -->
  <div class="view-container">
    {#if !currentProject}
      <div class="empty-state">
        <div class="empty-icon">📁</div>
        <p>No project selected. Create a folder inside your configured projects folder to get started.</p>
      </div>
    {:else if viewMode === 'gantt'}
      <GanttChart
        tasks={currentTasks}
        {onOpenTask}
        onDateChange={(taskId, startDate, endDate) =>
          handleDateChange(currentProject.folderPath, taskId, startDate, endDate)
        }
        onAddSubtask={(parentId, parentTitle) => openNewTaskModal(parentId, parentTitle)}
        onArchiveTask={(taskId, filePath, isSubtask) =>
          handleArchiveTask(currentProject.folderPath, taskId, filePath, isSubtask)
        }
      />
    {:else}
      <KanbanBoard
        tasks={currentTasks}
        {onOpenTask}
        onStatusChange={(taskId, newStatus) =>
          handleStatusChange(currentProject.folderPath, taskId, newStatus)
        }
        onAddSubtask={(parentId, parentTitle) => openNewTaskModal(parentId, parentTitle)}
        onArchiveTask={(taskId, filePath, isSubtask) =>
          handleArchiveTask(currentProject.folderPath, taskId, filePath, isSubtask)
        }
      />
    {/if}
  </div>

  <!-- ── Context: add subtask from task list (right-click / button) ───────── -->
  <!-- This is available via the openNewTaskModal export -->
</div>

<!-- ── Task Creation Modal ──────────────────────────────────────────────────── -->
{#if showModal}
  <TaskModal
    parentId={modalParentId}
    parentTitle={modalParentTitle}
    onSubmit={handleModalSubmit}
    onCancel={() => (showModal = false)}
  />
{/if}

<style>
  .project-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--background-primary);
  }

  /* ── Top bar ─────────────────────────────────────────────────── */
  .topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 14px;
    border-bottom: 1px solid var(--background-modifier-border);
    background: var(--background-secondary);
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  .topbar-label {
    font-size: 0.8em;
    color: var(--text-muted);
    font-weight: 600;
  }

  .project-selector {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    flex-wrap: wrap;
  }

  .project-tab {
    background: var(--background-primary);
    border: 1px solid var(--background-modifier-border);
    border-radius: 6px;
    padding: 4px 12px;
    cursor: pointer;
    font-size: 0.85em;
    color: var(--text-normal);
    transition: background 0.1s, border-color 0.1s;
  }

  .project-tab:hover {
    background: var(--background-modifier-hover);
  }

  .project-tab.active {
    background: var(--interactive-accent);
    color: var(--text-on-accent);
    border-color: var(--interactive-accent);
  }

  .no-projects {
    font-size: 0.82em;
    color: var(--text-muted);
    font-style: italic;
  }

  .view-switcher {
    display: flex;
    gap: 4px;
    background: var(--background-primary);
    border: 1px solid var(--background-modifier-border);
    border-radius: 6px;
    padding: 3px;
  }

  .view-btn {
    background: none;
    border: none;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.84em;
    color: var(--text-muted);
    font-weight: 500;
    transition: background 0.1s, color 0.1s;
  }

  .view-btn:hover {
    background: var(--background-modifier-hover);
    color: var(--text-normal);
  }

  .view-btn.active {
    background: var(--interactive-accent);
    color: var(--text-on-accent);
  }

  .topbar-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
  }

  .btn-add {
    background: var(--interactive-accent);
    color: var(--text-on-accent);
    border: none;
    border-radius: 5px;
    padding: 5px 14px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.85em;
    white-space: nowrap;
  }

  .btn-add:hover {
    filter: brightness(1.1);
  }

  .btn-refresh {
    background: none;
    border: 1px solid var(--background-modifier-border);
    border-radius: 5px;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 1.1em;
    color: var(--text-muted);
    transition: transform 0.4s;
  }

  .btn-refresh:hover {
    background: var(--background-modifier-hover);
    color: var(--text-normal);
  }

  .btn-refresh.spinning {
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* ── View container ──────────────────────────────────────────── */
  .view-container {
    flex: 1;
    overflow: hidden;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-muted);
    gap: 12px;
  }

  .empty-icon {
    font-size: 3em;
  }
</style>
