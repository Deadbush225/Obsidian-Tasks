export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Subtask {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string | null;
  endDate: string | null;
  filePath: string;
  parentId: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string | null;   // ISO date string YYYY-MM-DD
  endDate: string | null;     // ISO date string YYYY-MM-DD
  assignee: string;
  tags: string[];
  description: string;
  filePath: string;
  projectFolder: string;
  subtasks: Subtask[];
  parentId: string | null;
}

export interface Project {
  name: string;
  folderPath: string;
  tasks: Task[];
}

export interface GanttPluginSettings {
  projectsFolder: string;
  defaultStatus: TaskStatus;
  defaultPriority: TaskPriority;
}

export const DEFAULT_SETTINGS: GanttPluginSettings = {
  projectsFolder: 'Projects',
  defaultStatus: 'todo',
  defaultPriority: 'medium',
};
