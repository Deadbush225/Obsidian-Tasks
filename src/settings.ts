import { App, PluginSettingTab, Setting } from 'obsidian';
import type GanttPlugin from './main';

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
  }
}
