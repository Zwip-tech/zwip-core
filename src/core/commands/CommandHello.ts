import { CommandSender } from "./CommandSender";
import { Permission } from "../permissions/PermissionDecorator";
import { CommandBase } from "./CommandBase";
import { Command } from "./CommandDecorator";

@Command("hello", ["hi"])
@Permission("zwip.hello")
export class CommandHello extends CommandBase {
  public execute(sender: CommandSender, args: string[]): void {
    console.log("CommandHello executed !!!", args);
    console.log("Command label from command executor: ", this.label);
  }
}