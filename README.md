# Obsidian Gantt & Kanban

A Monday.com-style project management plugin for [Obsidian](https://obsidian.md) with **Gantt** and **Kanban** views.

---

## Features

| Feature | Description |
|---|---|
| 📁 **Folder-based projects** | Each subfolder inside your configured Projects folder is a separate project |
| 📋 **Kanban board** | Drag tasks between To Do / In Progress / Blocked / Done columns |
| 📊 **Gantt chart** | Timeline view with draggable bars — drag to set start/end, resize handles on each end |
| ✅ **Tasks as notes** | Every task is a Markdown note with YAML frontmatter — fully readable without the plugin |
| 🗂 **Subtasks** | Tasks can have subtasks (stored in a subfolder named after the parent task ID) |
| 🔗 **Open task** | Click a task title to open its note in the editor |

---

## Installation

After building (`npm run build`), copy the contents of `obsidian-gantt-plugin/` into your vault:

```bash
cp -r obsidian-gantt-plugin/ /path/to/vault/.obsidian/plugins/obsidian-gantt/
```

Then enable the plugin in **Settings → Community plugins**.

---

## Development

```bash
npm install
npm run build       # one-off build → dist/ + obsidian-gantt-plugin/
npm run dev         # watch mode (auto-rebuild on save)
```

---

## Usage

### 1. Configure your projects folder

**Settings → Obsidian Gantt & Kanban → Projects folder** (default: `Projects`).

### 2. Create a project

Create a subfolder inside your Projects folder. Each subfolder = one project.

```
Projects/
├── Website Redesign/
├── Mobile App/
└── Marketing Q1/
```

### 3. Open the board

Click the ribbon icon or run **"Open Project Board"** from the command palette.

### 4. Create tasks

Click **+ New Task**. The plugin creates a Markdown note with frontmatter:

```yaml
---
id: aBcDeFgHiJkL
title: Design homepage
status: todo
priority: high
start_date: 2026-02-25
end_date: 2026-03-10
assignee: Alice
tags: [design, frontend]
parent_id:
---
```

### 5. Gantt view

- **Drag a bar** to move it (changes start + end dates)
- **Drag left/right handle** to resize (changes only start or end date)
- **Click an empty row cell** to create a new bar spanning 5 days from that point
- Expand subtasks with the **▸** toggle on the left panel
- Today is marked with a colored vertical line

---

## Task frontmatter reference

| Field | Values |
|---|---|
| `status` | `todo` · `in-progress` · `blocked` · `done` |
| `priority` | `low` · `medium` · `high` · `critical` |
| `start_date` | `YYYY-MM-DD` |
| `end_date` | `YYYY-MM-DD` |
| `parent_id` | ID of parent task (empty for top-level tasks) |
