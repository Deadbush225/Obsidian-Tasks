import { ItemView, WorkspaceLeaf } from 'obsidian';
import type GanttPlugin from './main';
import type { Project, Task, TaskStatus } from './types';
import { loadProjects, createTaskNote, updateTaskField } from './taskUtils';
import ProjectView from './components/ProjectView.svelte';
import { mount, unmount } from 'svelte';

export const GANTT_VIEW_TYPE = 'obsidian-gantt-view';

export class GanttView extends ItemView {
  plugin: GanttPlugin;
  private svelteComponent: Record<string, any> | null = null;
  // These are kept in the TS class so they survive vault-event refreshes
  private activeProjectIndex = 0;
  private viewMode: 'gantt' | 'kanban' = 'gantt';
  /** Set true during our own vault writes to suppress the vault-event re-render */
  private _writing = false;

  constructor(leaf: WorkspaceLeaf, plugin: GanttPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string { return GANTT_VIEW_TYPE; }
  getDisplayText(): string { return 'Project Board'; }
  getIcon(): string { return 'layout-dashboard'; }

  async onOpen(): Promise<void> {
    this.mountSvelte();

    // Trigger the component's own refresh when vault changes happen externally
    this.registerEvent(this.app.vault.on('create', () => { if (!this._writing) this.triggerComponentRefresh(); }));
    this.registerEvent(this.app.vault.on('modify', () => { if (!this._writing) this.triggerComponentRefresh(); }));
    this.registerEvent(this.app.vault.on('delete', () => { if (!this._writing) this.triggerComponentRefresh(); }));
    this.registerEvent(this.app.vault.on('rename', () => { if (!this._writing) this.triggerComponentRefresh(); }));
  }

  async onClose(): Promise<void> {
    if (this.svelteComponent) {
      unmount(this.svelteComponent);
      this.svelteComponent = null;
    }
  }

  /** Called by vault events — tells the Svelte component to reload its own data */
  private triggerComponentRefresh() {
    if (this.svelteComponent?.refresh) {
      this.svelteComponent.refresh();
    }
  }

  private mountSvelte() {
    if (this.svelteComponent) return; // already mounted; component manages its own data

    const container = this.containerEl.children[1] as HTMLElement;
    container.empty();
    container.style.padding = '0';
    container.style.overflow = 'hidden';

    this.svelteComponent = mount(ProjectView, {
      target: container,
      props: {
        projects: [],          // initial empty; component loads via loadProjectsFn
        activeProjectIndex: this.activeProjectIndex,
        viewMode: this.viewMode,
        loadProjectsFn: () => loadProjects(this.app, this.plugin.settings.projectsFolder),
        onCreateTask: this.handleCreateTask.bind(this),
        onStatusChange: this.handleStatusChange.bind(this),
        onDateChange: this.handleDateChange.bind(this),
        onOpenTask: this.handleOpenTask.bind(this),
        onViewModeChange: (mode: 'gantt' | 'kanban') => { this.viewMode = mode; },
        onActiveProjectChange: (idx: number) => { this.activeProjectIndex = idx; },
      },
    });

    // Kick off the initial data load inside the component
    this.triggerComponentRefresh();
  }

  private handleOpenTask(filePath: string) {
    const file = this.app.vault.getFileByPath(filePath);
    if (file) this.app.workspace.getLeaf(false).openFile(file);
  }

  private async handleCreateTask(
    projectFolder: string,
    title: string,
    parentId: string | null,
    extra: Partial<Task>
  ) {
    this._writing = true;
    try {
      await createTaskNote(this.app, projectFolder, title, parentId, extra);
    } finally {
      this._writing = false;
    }
    // Component will call its own refresh after onCreateTask resolves
  }

  private async handleStatusChange(
    _projectFolder: string,
    taskId: string,
    newStatus: TaskStatus
  ) {
    // Need a snapshot of projects to find the file path.
    // We load fresh here so we always have current data.
    const projects = await loadProjects(this.app, this.plugin.settings.projectsFolder);
    const task = this.findTaskById(projects, taskId);
    if (!task) return;
    const file = this.app.vault.getFileByPath(task.filePath);
    if (!file) return;
    this._writing = true;
    try {
      await updateTaskField(this.app, file, 'status', newStatus);
    } finally {
      this._writing = false;
    }
  }

  private async handleDateChange(
    _projectFolder: string,
    taskId: string,
    startDate: string,
    endDate: string
  ) {
    const projects = await loadProjects(this.app, this.plugin.settings.projectsFolder);
    const task = this.findTaskById(projects, taskId);
    if (!task) return;
    const file = this.app.vault.getFileByPath(task.filePath);
    if (!file) return;
    this._writing = true;
    try {
      await updateTaskField(this.app, file, 'start_date', startDate);
      await updateTaskField(this.app, file, 'end_date', endDate);
    } finally {
      this._writing = false;
    }
  }

  private findTaskById(projects: Project[], id: string): Task | null {
    for (const proj of projects) {
      for (const task of proj.tasks) {
        if (task.id === id) return task;
        for (const sub of task.subtasks) {
          if (sub.id === id) return sub as unknown as Task;
        }
      }
    }
    return null;
  }
}
