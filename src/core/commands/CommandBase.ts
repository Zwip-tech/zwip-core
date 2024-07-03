import { CommandInterface } from "./CommandInterface";
import { CommandSender } from "./CommandSender";

export class CommandBase implements CommandInterface {
  public label: string;
  public aliases: string[];

  public constructor(label: string, aliases: string[]) {
    this.label = label;
    this.aliases = aliases;
  }

  execute(sender: CommandSender, args: string[]): void {
    throw new Error("Command not implemented.");
  }
}