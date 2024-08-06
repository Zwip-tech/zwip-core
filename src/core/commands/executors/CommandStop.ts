import { CommandBase } from "../CommandBase";
import { Command } from "../CommandDecorator";
import { ActionStopZwip } from "../../actions/ActionStopZwip";
import { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";

@Command("stop", ["s"])
export class CommandStop extends CommandBase {
  public buildSlashCommand(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return new SlashCommandBuilder().setName("stop").setDescription("Stop the bot").toJSON();
  }

  public executeTerminalCommand(_args: string[]): void {
    ActionStopZwip.run();
  }

  public executeSlashCommand(interaction: ChatInputCommandInteraction): void {
    interaction.reply({ content: "Goodbye and see you next time !", ephemeral: true });
    ActionStopZwip.run();
  }
}