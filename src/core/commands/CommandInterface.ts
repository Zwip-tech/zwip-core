import { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

export interface CommandInterface {
  buildSlashCommand(): RESTPostAPIChatInputApplicationCommandsJSONBody | null;
  executeSlashCommand(interaction: ChatInputCommandInteraction): void;
  executeTerminalCommand(args: string[]): void;
}