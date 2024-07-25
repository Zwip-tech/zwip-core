import { mkdir, readdir, unlink } from "node:fs/promises";
import { resolve} from "node:path";
import { Plugin } from "./Plugin";

export class PluginLoader {
  public static PLUGIN_FOLDER: string = "./plugins";

  public async loadAll(): Promise<void> {
    const directoryExists = await readdir(PluginLoader.PLUGIN_FOLDER).catch(() => false);

    if (!directoryExists) {
      await mkdir(PluginLoader.PLUGIN_FOLDER, { recursive: true });
    }

    const pluginFiles = await readdir(PluginLoader.PLUGIN_FOLDER);

    for (const file of pluginFiles) {
     console.log(`Loading plugin: ${file}`);
     const pluginPath = resolve(PluginLoader.PLUGIN_FOLDER, file);
     console.log("pluginPath", pluginPath);
     const pluginModule = await import(pluginPath);
     const plugin: Plugin = new pluginModule.default();

     plugin.onLoad();
     plugin.onEnable();
    }
  }
}