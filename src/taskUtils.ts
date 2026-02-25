import type { App, TFile, TFolder } from 'obsidian';
import type { Task, Subtask, Project, TaskStatus, TaskPriority } from './types';
import { nanoid } from './nanoid';

/**
 * Generates the frontmatter YAML for a new task note.
 */
export function generateTaskFrontmatter(task: Partial<Task>): string {
  const lines: string[] = [
    '---',
    `id: ${task.id ?? nanoid()}`,
    `title: ${task.title ?? 'Untitled Task'}`,
    `status: ${task.status ?? 'todo'}`,
    `priority: ${task.priority ?? 'medium'}`,
    `start_date: ${task.startDate ?? ''}`,
    `end_date: ${task.endDate ?? ''}`,
    `assignee: ${task.assignee ?? ''}`,
    `tags: [${(task.tags ?? []).join(', ')}]`,
    `parent_id: ${task.parentId ?? ''}`,
    '---',
    '',
    `# ${task.title ?? 'Untitled Task'}`,
    '',
    '## Description',
    '',
    task.description ?? '',
    '',
    '## Notes',
    '',
  ];
  return lines.join('\n');
}

/**
 * Parse the frontmatter of a task note file into a Task object.
 */
export function parseTaskFile(file: TFile, content: string, projectFolder: string): Task | null {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;

  const fm = fmMatch[1];
  const get = (key: string): string => {
    const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
    return m ? m[1].trim() : '';
  };

  const tagsRaw = get('tags').replace(/^\[|\]$/g, '');
  const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

  return {
    id: get('id') || file.basename,
    title: get('title') || file.basename,
    status: (get('status') as TaskStatus) || 'todo',
    priority: (get('priority') as TaskPriority) || 'medium',
    startDate: get('start_date') || null,
    endDate: get('end_date') || null,
    assignee: get('assignee'),
    tags,
    description: '',
    filePath: file.path,
    projectFolder,
    subtasks: [],
    parentId: get('parent_id') || null,
  };
}

/**
 * Load all projects from the configured folder.
 */
export async function loadProjects(app: App, projectsFolder: string): Promise<Project[]> {
  const rootFolder = app.vault.getFolderByPath(projectsFolder);
  if (!rootFolder) return [];

  const projects: Project[] = [];

  for (const child of rootFolder.children) {
    if (!(child as TFolder).children) continue; // skip files
    const projectFolder = child as TFolder;
    const tasks = await loadTasksFromFolder(app, projectFolder, projectFolder.path);
    projects.push({
      name: projectFolder.name,
      folderPath: projectFolder.path,
      tasks,
    });
  }

  return projects;
}

/**
 * Recursively load tasks from a project folder.
 * Files directly under the project folder are top-level tasks.
 * Files in subfolders of the project folder are subtasks of the matching parent.
 */
async function loadTasksFromFolder(
  app: App,
  folder: TFolder,
  projectFolderPath: string
): Promise<Task[]> {
  const allTasks: Map<string, Task> = new Map();

  // First pass: collect all task files recursively
  await collectTaskFiles(app, folder, projectFolderPath, allTasks);

  // Second pass: wire up subtasks
  const topLevel: Task[] = [];
  for (const task of allTasks.values()) {
    if (task.parentId && allTasks.has(task.parentId)) {
      const parent = allTasks.get(task.parentId)!;
      parent.subtasks.push(task as unknown as Subtask);
    } else {
      topLevel.push(task);
    }
  }

  return topLevel;
}

async function collectTaskFiles(
  app: App,
  folder: TFolder,
  projectFolderPath: string,
  map: Map<string, Task>
) {
  for (const child of folder.children) {
    if ((child as TFolder).children) {
      // It's a folder — skip the archive folder entirely
      if (child.name === 'archive') continue;
      await collectTaskFiles(app, child as TFolder, projectFolderPath, map);
    } else {
      const file = child as TFile;
      if (file.extension !== 'md') continue;
      const content = await app.vault.cachedRead(file);
      const task = parseTaskFile(file, content, projectFolderPath);
      if (task) map.set(task.id, task);
    }
  }
}

/**
 * Create a new task note inside the given project folder.
 */
export async function createTaskNote(
  app: App,
  projectFolderPath: string,
  title: string,
  parentId: string | null = null,
  extra: Partial<Task> = {}
): Promise<TFile> {
  const id = nanoid();
  const safeName = title.replace(/[\\/:*?"<>|]/g, '-');
  let filePath: string;

  if (parentId) {
    // Subtasks live in a subfolder named after parent id
    const subDir = `${projectFolderPath}/${parentId}`;
    await ensureFolder(app, subDir);
    filePath = `${subDir}/${safeName}.md`;
  } else {
    filePath = `${projectFolderPath}/${safeName}.md`;
  }

  const task: Partial<Task> = {
    id,
    title,
    parentId,
    ...extra,
  };

  const content = generateTaskFrontmatter(task);

  // Ensure project folder exists
  await ensureFolder(app, projectFolderPath);

  return app.vault.create(filePath, content);
}

/**
 * Update a specific frontmatter field in a task note.
 */
export async function updateTaskField(
  app: App,
  file: TFile,
  key: string,
  value: string
): Promise<void> {
  let content = await app.vault.read(file);
  const pattern = new RegExp(`^(${key}:\\s*)(.*)$`, 'm');
  if (pattern.test(content)) {
    content = content.replace(pattern, `$1${value}`);
  }
  await app.vault.modify(file, content);
}

async function ensureFolder(app: App, path: string) {
  if (!app.vault.getFolderByPath(path)) {
    await app.vault.createFolder(path);
  }
}

/**
 * Archive a task (and its subtasks subfolder) by moving it to
 * <projectFolder>/archive/.
 * Uses read+create+delete instead of fileManager.renameFile to avoid
 * Obsidian's link-rewriting which fires vault events mid-operation.
 */
export async function archiveTask(
  app: App,
  taskFilePath: string,
  taskId: string,
  projectFolder: string,
  isSubtask: boolean
): Promise<void> {
  const archiveDir = `${projectFolder}/archive`;
  await ensureFolder(app, archiveDir);

  // Move the task note file
  const file = app.vault.getFileByPath(taskFilePath);
  if (file) {
    await moveFile(app, file, archiveDir);
  }

  // If top-level task, also move its subtask subfolder contents
  if (!isSubtask) {
    const subFolder = app.vault.getFolderByPath(`${projectFolder}/${taskId}`);
    if (subFolder) {
      const archiveSubDir = `${archiveDir}/${taskId}`;
      await ensureFolder(app, archiveSubDir);
      const children = [...subFolder.children]; // snapshot before moving
      for (const child of children) {
        const childFile = child as TFile;
        if (childFile.extension === 'md') {
          await moveFile(app, childFile, archiveSubDir);
        }
      }
      // Remove the now-empty subfolder
      try {
        await (app.vault.adapter as any).rmdir(`${projectFolder}/${taskId}`, false);
      } catch { /* ignore */ }
    }
  }
}

/** Move a TFile into destDir using vault.rename (true filesystem move). */
async function moveFile(app: App, file: TFile, destDir: string): Promise<void> {
  // Build a unique destination path
  let destPath = `${destDir}/${file.name}`;
  if (app.vault.getAbstractFileByPath(destPath)) {
    destPath = `${destDir}/${file.basename}-${Date.now()}.${file.extension}`;
  }
  await app.vault.rename(file, destPath);
}
