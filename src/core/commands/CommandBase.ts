import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { CommandInterface } from "./CommandInterface";

export abstract class CommandBase implements CommandInterface {
  public label: string;
  public aliases: string[];

  public constructor(label: string, aliases: string[]) {
    this.label = label;
    this.aliases = aliases;
  }

  public buildSlashCommand(): RESTPostAPIChatInputApplicationCommandsJSONBody | null {
    return null;
  };
  public executeTerminalCommand(_args: string[]): void {};
  public executeSlashCommand(_interaction: CommandInteraction): void {};
}