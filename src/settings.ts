import { App, Modal, Notice, PluginSettingTab, Setting } from 'obsidian';
import type GanttPlugin from './main';
import { GanttSyncService } from './syncService';

// ── Conflict resolution modal ────────────────────────────────────────────────

export class SyncConflictModal extends Modal {
  private conflicts: any[];
  private svc: GanttSyncService;
  private plugin: GanttPlugin;
  private onResolved: () => void;

  constructor(app: App, plugin: GanttPlugin, svc: GanttSyncService, conflicts: any[], onResolved: () => void) {
    super(app);
    this.plugin      = plugin;
    this.svc         = svc;
    this.conflicts   = conflicts;
    this.onResolved  = onResolved;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h3', { text: `⚠️ ${this.conflicts.length} sync conflict${this.conflicts.length > 1 ? 's' : ''}` });
    contentEl.createEl('p', {
      text: 'The server has newer versions of these tasks. Choose how to resolve:',
      cls: 'setting-item-description',
    });

    const list = contentEl.createEl('ul');
    for (const c of this.conflicts) {
      list.createEl('li', { text: c.title ?? c.id ?? '(unknown)' });
    }

    const btnRow = contentEl.createDiv({ cls: 'modal-button-container' });
    btnRow.style.display       = 'flex';
    btnRow.style.gap            = '8px';
    btnRow.style.justifyContent = 'flex-end';
    btnRow.style.marginTop      = '16px';

    const keepBtn = btnRow.createEl('button', { text: 'Keep mine (override server)' });
    keepBtn.addEventListener('click', async () => {
      keepBtn.disabled = true;
      keepBtn.textContent = 'Pushing…';
      try {
        await this.svc.forcePushTasks(this.app, this.plugin.settings.projectsFolder, this.conflicts);
        new Notice(`✅ Your version pushed — server updated for ${this.conflicts.length} task(s).`);
      } catch (e: any) {
        new Notice(`❌ Force-push failed: ${e.message}`);
      } finally {
        this.close();
        this.onResolved();
      }
    });

    const acceptBtn = btnRow.createEl('button', { text: 'Accept server', cls: 'mod-cta' });
    acceptBtn.addEventListener('click', () => {
      // Server versions were already applied to disk during syncAll — nothing more needed.
      new Notice(`✅ Server versions accepted for ${this.conflicts.length} task(s).`);
      this.close();
      this.onResolved();
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

export class GanttSettingTab extends PluginSettingTab {
  plugin: GanttPlugin;

  constructor(app: App, plugin: GanttPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Obsidian Gantt & Kanban — Settings' });

    new Setting(containerEl)
      .setName('Projects folder')
      .setDesc(
        'Root folder where your project folders live. Each subfolder becomes a project.'
      )
      .addText((text) =>
        text
          .setPlaceholder('Projects')
          .setValue(this.plugin.settings.projectsFolder)
          .onChange(async (value) => {
            this.plugin.settings.projectsFolder = value.trim() || 'Projects';
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Default task status')
      .setDesc('Status assigned to newly created tasks.')
      .addDropdown((dd) =>
        dd
          .addOption('todo', 'To Do')
          .addOption('in-progress', 'In Progress')
          .addOption('done', 'Done')
          .addOption('blocked', 'Blocked')
          .setValue(this.plugin.settings.defaultStatus)
          .onChange(async (value) => {
            this.plugin.settings.defaultStatus = value as any;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Default task priority')
      .setDesc('Priority assigned to newly created tasks.')
      .addDropdown((dd) =>
        dd
          .addOption('low', 'Low')
          .addOption('medium', 'Medium')
          .addOption('high', 'High')
          .addOption('critical', 'Critical')
          .setValue(this.plugin.settings.defaultPriority)
          .onChange(async (value) => {
            this.plugin.settings.defaultPriority = value as any;
            await this.plugin.saveSettings();
          })
      );

    // ── Cloud Sync ────────────────────────────────────────────────────────────
    containerEl.createEl('h3', { text: 'Cloud Sync (optional)' });
    containerEl.createEl('p', {
      text: 'Connect to a self-hosted gantt backend to sync tasks across devices.',
      cls: 'setting-item-description',
    });

    new Setting(containerEl)
      .setName('Server URL')
      .setDesc('Base URL of your sync backend, e.g. https://yourname.heliohost.us/obgantt/backend')
      .addText((text) =>
        text
          .setPlaceholder('https://…/backend')
          .setValue(this.plugin.settings.syncBaseUrl)
          .onChange(async (value) => {
            this.plugin.settings.syncBaseUrl = value.trim();
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Email')
      .setDesc('Account email address for the sync server.')
      .addText((text) =>
        text
          .setPlaceholder('you@example.com')
          .setValue(this.plugin.settings.syncEmail)
          .onChange(async (value) => {
            this.plugin.settings.syncEmail = value.trim();
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Password')
      .setDesc('Account password. Stored in Obsidian plugin data.')
      .addText((text) => {
        text.inputEl.type = 'password';
        text
          .setPlaceholder('••••••••')
          .setValue(this.plugin.settings.syncPassword)
          .onChange(async (value) => {
            this.plugin.settings.syncPassword = value;
            await this.plugin.saveSettings();
          });
      });

    const syncStatusEl = containerEl.createEl('p', {
      text: '',
      cls: 'setting-item-description',
    });

    new Setting(containerEl)
      .setName('Sync now')
      .setDesc('Manually pull & push all tasks with the server.')
      .addButton((btn) =>
        btn
          .setButtonText('Sync')
          .setCta()
          .onClick(async () => {
            const { syncBaseUrl, syncEmail, syncPassword } = this.plugin.settings;
            if (!syncBaseUrl || !syncEmail || !syncPassword) {
              syncStatusEl.textContent = '⚠️  Fill in Server URL, Email, and Password first.';
              return;
            }
            btn.setDisabled(true).setButtonText('Syncing…');
            syncStatusEl.textContent = '';
            try {
              const svc = new GanttSyncService(syncBaseUrl, syncEmail, syncPassword);
              await svc.login();
              const result = await svc.syncAll(this.plugin.app, this.plugin.settings.projectsFolder);
              const summary = `↑${result.pushed} pushed, ↓${result.pulled} pulled, ${result.deleted} deleted`;
              if (result.conflictTasks.length > 0) {
                syncStatusEl.textContent = `⚠️  Sync done — ${summary}. ${result.conflictTasks.length} conflict(s) need resolution.`;
                new SyncConflictModal(
                  this.plugin.app,
                  this.plugin,
                  svc,
                  result.conflictTasks,
                  () => { syncStatusEl.textContent = `✅  Resolved — ${summary}.`; },
                ).open();
              } else {
                syncStatusEl.textContent = `✅  Sync complete — ${summary}.`;
              }
            } catch (e: any) {
              syncStatusEl.textContent = `❌  ${e.message}`;
            } finally {
              btn.setDisabled(false).setButtonText('Sync');
            }
          })
      );
  }
}
