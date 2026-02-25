import { ItemView, WorkspaceLeaf } from 'obsidian';
import type GanttPlugin from './main';
import type { Project, Task, TaskStatus } from './types';
import { loadProjects, createTaskNote, updateTaskField } from './taskUtils';
import ProjectView from './components/ProjectView.svelte';
import { mount, unmount } from 'svelte';

export const GANTT_VIEW_TYPE = 'obsidian-gantt-view';

export class GanttView extends ItemView {
  plugin: GanttPlugin;
  private svelteComponent: ReturnType<typeof mount> | null = null;
  private projects: Project[] = [];
  private activeProjectIndex = 0;
  private viewMode: 'gantt' | 'kanban' = 'gantt';
  /** Prevent vault-event re-renders during our own programmatic writes */
  private _writing = false;

  constructor(leaf: WorkspaceLeaf, plugin: GanttPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return GANTT_VIEW_TYPE;
  }

  getDisplayText(): string {
    return 'Project Board';
  }

  getIcon(): string {
    return 'layout-dashboard';
  }

  async onOpen(): Promise<void> {
    this.projects = await loadProjects(this.app, this.plugin.settings.projectsFolder);
    this.mountSvelte();

    // Re-render when vault changes (but not during our own writes)
    this.registerEvent(
      this.app.vault.on('create', () => { if (!this._writing) this.refresh(); })
    );
    this.registerEvent(
      this.app.vault.on('modify', () => { if (!this._writing) this.refresh(); })
    );
    this.registerEvent(
      this.app.vault.on('delete', () => { if (!this._writing) this.refresh(); })
    );
    this.registerEvent(
      this.app.vault.on('rename', () => { if (!this._writing) this.refresh(); })
    );
  }

  async onClose(): Promise<void> {
    if (this.svelteComponent) {
      unmount(this.svelteComponent);
      this.svelteComponent = null;
    }
  }

  private mountSvelte() {
    if (this.svelteComponent) {
      unmount(this.svelteComponent);
      this.svelteComponent = null;
    }

    const container = this.containerEl.children[1] as HTMLElement;
    container.empty();
    container.style.padding = '0';
    container.style.overflow = 'hidden';

    this.svelteComponent = mount(ProjectView, {
      target: container,
      props: {
        projects: this.projects,
        activeProjectIndex: this.activeProjectIndex,
        viewMode: this.viewMode,
        onCreateTask: this.handleCreateTask.bind(this),
        onStatusChange: this.handleStatusChange.bind(this),
        onDateChange: this.handleDateChange.bind(this),
        onOpenTask: this.handleOpenTask.bind(this),
        onRefresh: this.refresh.bind(this),
        onViewModeChange: (mode: 'gantt' | 'kanban') => { this.viewMode = mode; },
        onActiveProjectChange: (idx: number) => { this.activeProjectIndex = idx; },
      },
    });
  }

  async refresh() {
    this.projects = await loadProjects(this.app, this.plugin.settings.projectsFolder);
    this.mountSvelte();
  }

  private handleOpenTask(filePath: string) {
    const file = this.app.vault.getFileByPath(filePath);
    if (file) {
      this.app.workspace.getLeaf(false).openFile(file);
    }
  }

  private async handleCreateTask(
    projectFolder: string,
    title: string,
    parentId: string | null,
    extra: Partial<Task>
  ) {
    await createTaskNote(this.app, projectFolder, title, parentId, extra);
  }

  private async handleStatusChange(
    projectFolder: string,
    taskId: string,
    newStatus: TaskStatus
  ) {
    const task = this.findTaskById(taskId);
    if (!task) return;
    const file = this.app.vault.getFileByPath(task.filePath);
    if (!file) return;
    this._writing = true;
    try {
      await updateTaskField(this.app, file, 'status', newStatus);
    } finally {
      this._writing = false;
    }
    await this.refresh();
  }

  private async handleDateChange(
    projectFolder: string,
    taskId: string,
    startDate: string,
    endDate: string
  ) {
    const task = this.findTaskById(taskId);
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
    await this.refresh();
  }

  private findTaskById(id: string): Task | null {
    for (const proj of this.projects) {
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
