import { CommandSender } from "./CommandSender";

export interface CommandInterface {
  execute(sender: CommandSender, args: string[]): void;
}