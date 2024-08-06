import { CommandBase } from "../CommandBase";
import { ActionListPlugins } from "../../actions/ActionListPlugins";
import { Command } from "../CommandDecorator";
import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";

@Command("plugins", ["pl"])
export class CommandPlugins extends CommandBase {
  public buildSlashCommand(): RESTPostAPIChatInputApplicationCommandsJSONBody | null {
    return new SlashCommandBuilder().setName("plugins").setDescription("List all loaded plugins.").toJSON();
  }

  public executeTerminalCommand(_args: string[]): void {
    ActionListPlugins.run();
  };

  public executeSlashCommand(interaction: CommandInteraction): void {
    const embed = ActionListPlugins.run(true);

    if (embed) {
      interaction.reply({ embeds: [embed] });
    }
  }
}