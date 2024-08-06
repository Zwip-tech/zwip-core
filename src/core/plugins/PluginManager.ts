import { Plugin } from './Plugin';
import { PluginLoader } from './PluginLoader';

export class PluginManager {
  public plugins: Plugin[];
  private pluginsLoader: PluginLoader;

  constructor() {
    this.plugins = [];
    this.pluginsLoader = new PluginLoader();
  }

  public async init(): Promise<void> {
    this.plugins = await this.pluginsLoader.loadAll();
  }
}