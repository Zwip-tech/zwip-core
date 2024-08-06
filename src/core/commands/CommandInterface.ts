import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

export interface CommandInterface {
  buildSlashCommand(): RESTPostAPIChatInputApplicationCommandsJSONBody | null;
  executeSlashCommand(interaction: CommandInteraction): void;
  executeTerminalCommand(args: string[]): void;
}