import { Zwip } from "../Zwip";
import { Terminal } from "../logger/Terminal";
import { EmbedBuilder } from "discord.js";
import { PluginManager } from "../plugins/PluginManager";

export class ActionListPlugins {

  public static run(embed: boolean = false): void | EmbedBuilder {
    const pluginManager = Zwip.instance.pluginManager;

    if (embed) {
      return this.buildEmbed(pluginManager);
    } else {
      this.displayTerminal(pluginManager);
    }
  }

  private static displayTerminal(pluginManager: PluginManager): void {
    if (pluginManager.plugins.length === 0) {
      Terminal.instance.info("No plugins loaded.");
      return;
    }

    Terminal.instance.info(`Plugins loaded (${pluginManager.plugins.length}):`);

    for (const plugin of pluginManager.plugins) {
      Terminal.instance.info(`- ${plugin.name} v${plugin.version}`);
    }
  }

  private static buildEmbed(pluginManager: PluginManager): EmbedBuilder {
    if (pluginManager.plugins.length === 0) {
      const embed = new EmbedBuilder()
        .setTitle("No plugins loaded.")
        .setDescription("There are no plugins loaded.");
      return embed;
    }

    const embed = new EmbedBuilder()
      .setTitle("Plugins loaded")
      .setDescription(`There are ${pluginManager.plugins.length} plugins loaded.`);

    for (const plugin of pluginManager.plugins) {
      embed.addFields({ name: plugin.name, value: `Version: ${plugin.version}`});
    }

    return embed;
  }
}