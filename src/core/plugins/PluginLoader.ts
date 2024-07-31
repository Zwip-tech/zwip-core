import { mkdir, readdir } from "node:fs/promises";
import { resolve} from "node:path";
import { Plugin } from "./Plugin";
import { Terminal } from "../logger/Terminal";

export class PluginLoader {
  public static PLUGIN_FOLDER: string = "./plugins";

  public async loadAll(): Promise<void> {
    const directoryExists = await readdir(PluginLoader.PLUGIN_FOLDER).catch(() => false);

    if (!directoryExists) {
      await mkdir(PluginLoader.PLUGIN_FOLDER, { recursive: true });
    }

    const pluginFiles = await readdir(PluginLoader.PLUGIN_FOLDER);

    for (const file of pluginFiles) {
      if (file.endsWith(".js")) {
        (async () => {
          try {
            Terminal.instance.info(`Loading plugin: ${file}`);

            const pluginPath = resolve(PluginLoader.PLUGIN_FOLDER, file);
            const pluginModule = await import(pluginPath);
            const plugin: Plugin = new pluginModule.default();

            plugin.onLoad();
            plugin.onEnable();
            
            Terminal.instance.info(`Plugin loaded: ${plugin.name}`);
          } catch (error) {
            console.error(`Failed to load plugin: ${file}`);
            console.error(`Error: ${error}`);
          }
        })();
      }
    }
  }
}