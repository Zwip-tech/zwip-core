import { CommandSender } from "./CommandSender";
import { Permission } from "../permissions/PermissionDecorator";
import { CommandBase } from "./CommandBase";
import { Command } from "./CommandDecorator";

@Command("stop", ["s"])
@Permission("zwip.stop")
export class CommandStop extends CommandBase {
  public execute(sender: CommandSender, args: string[]): void {
    console.log("CommandStop executed !!!");
    console.log("Command label : ", this.label);
  }
}