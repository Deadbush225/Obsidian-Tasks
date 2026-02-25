import { mount } from 'svelte'
import { Plugin } from 'obsidian';
import type { GanttPluginSettings } from './types';
import { DEFAULT_SETTINGS } from './types';
import { GanttSettingTab } from './settings';
import { GanttView, GANTT_VIEW_TYPE } from './view';

export default class GanttPlugin extends Plugin {
  settings: GanttPluginSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();

    // Register the combined Gantt/Kanban view
    this.registerView(GANTT_VIEW_TYPE, (leaf) => new GanttView(leaf, this));

    // Ribbon icon to open the view
    this.addRibbonIcon('layout-dashboard', 'Open Project Board', async () => {
      await this.activateView();
    });

    // Command palette entry
    this.addCommand({
      id: 'open-project-board',
      name: 'Open Project Board',
      callback: async () => {
        await this.activateView();
      },
    });

    // Settings tab
    this.addSettingTab(new GanttSettingTab(this.app, this));
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(GANTT_VIEW_TYPE);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(GANTT_VIEW_TYPE)[0];

    if (!leaf) {
      leaf = workspace.getLeaf(false);
      await leaf.setViewState({ type: GANTT_VIEW_TYPE, active: true });
    }

    workspace.revealLeaf(leaf);
  }
}
