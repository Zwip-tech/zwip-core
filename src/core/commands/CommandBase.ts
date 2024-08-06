import { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { CommandInterface } from "./CommandInterface";
import { Terminal } from "../logger/Terminal";

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
  public executeTerminalCommand(_args: string[]): void {
    Terminal.instance.warn("This command does not support terminal execution.");
  };
  public executeSlashCommand(_interaction: ChatInputCommandInteraction): void {
    Terminal.instance.warn("This command does not support slash command execution.");
  };
}