import { CommandSender } from "../CommandSender";
import { Permission } from "../../permissions/PermissionDecorator";
import { CommandBase } from "../CommandBase";
import { Command } from "../CommandDecorator";
import { Terminal } from "../../logger/Terminal";

@Command("stop", ["s"])
@Permission("zwip.stop")
export class CommandStop extends CommandBase {
  public execute(sender: CommandSender, args: string[]): void {
    Terminal.instance.info("Stopping Zwip...");
    process.exit(0);
  }
}