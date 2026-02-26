import { mount } from 'svelte'
import { Plugin, Notice } from 'obsidian';
import type { GanttPluginSettings } from './types';
import { DEFAULT_SETTINGS } from './types';
import { GanttSettingTab, SyncConflictModal } from './settings';
import { GanttView, GANTT_VIEW_TYPE } from './view';
import { GanttSyncService } from './syncService';

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

    // Ribbon icon to sync
    this.addRibbonIcon('refresh-cw', 'Sync tasks', async () => {
      const { syncBaseUrl, syncEmail, syncPassword } = this.settings;
      if (!syncBaseUrl || !syncEmail || !syncPassword) {
        new Notice('⚠️  Configure sync credentials in Settings first.');
        return;
      }
      new Notice('🔄 Syncing tasks…');
      try {
        const svc = new GanttSyncService(syncBaseUrl, syncEmail, syncPassword);
        await svc.login();
        const result = await svc.syncAll(this.app, this.settings.projectsFolder);
        const summary = `↑${result.pushed} pushed  ↓${result.pulled} pulled  ${result.deleted} deleted`;
        if (result.conflictTasks.length > 0) {
          new Notice(`⚠️ ${summary}  ${result.conflictTasks.length} conflict(s) — see modal`);
          new SyncConflictModal(this.app, this, svc, result.conflictTasks, () => {
            const leaf = this.app.workspace.getLeavesOfType(GANTT_VIEW_TYPE)[0];
            if (leaf) (leaf.view as any).refresh?.();
          }).open();
        } else {
          new Notice(`✅ ${summary}`);
        }
        const leaf = this.app.workspace.getLeavesOfType(GANTT_VIEW_TYPE)[0];
        if (leaf) (leaf.view as any).refresh?.();
      } catch (e: any) {
        new Notice(`❌ Sync failed: ${e.message}`);
      }
    });

    // Command palette entry
    this.addCommand({
      id: 'open-project-board',
      name: 'Open Project Board',
      callback: async () => {
        await this.activateView();
      },
    });

    // Command: sync tasks
    this.addCommand({
      id: 'sync-tasks',
      name: 'Sync tasks with server',
      callback: async () => {
        const { syncBaseUrl, syncEmail, syncPassword } = this.settings;
        if (!syncBaseUrl || !syncEmail || !syncPassword) {
          new Notice('⚠️  Configure sync credentials in Settings first.');
          return;
        }
        try {
          const svc = new GanttSyncService(syncBaseUrl, syncEmail, syncPassword);
          await svc.login();
          const result = await svc.syncAll(this.app, this.settings.projectsFolder);
          const summary = `↑${result.pushed} pushed  ↓${result.pulled} pulled  ${result.deleted} deleted`;
          if (result.conflictTasks.length > 0) {
            new Notice(`⚠️ ${summary}  ${result.conflictTasks.length} conflict(s) — see modal`);
            new SyncConflictModal(this.app, this, svc, result.conflictTasks, () => {}).open();
          } else {
            new Notice(`✅ ${summary}`);
          }
        } catch (e: any) {
          new Notice(`❌ Sync failed: ${e.message}`);
        }
      },
    });

    // Settings tab
    this.addSettingTab(new GanttSettingTab(this.app, this));

    // Auto-sync on startup if credentials are configured
    const { syncBaseUrl, syncEmail, syncPassword } = this.settings;
    if (syncBaseUrl && syncEmail && syncPassword) {
      this.app.workspace.onLayoutReady(async () => {
        try {
          const svc = new GanttSyncService(syncBaseUrl, syncEmail, syncPassword);
          await svc.login();
          await svc.syncAll(this.app, this.settings.projectsFolder);
        } catch (e: any) {
          console.warn('[Gantt] Auto-sync failed:', e.message);
        }
      });
    }
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
