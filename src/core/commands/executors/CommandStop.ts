import { CommandSender } from "../CommandSender";
import { Permission } from "../../permissions/PermissionDecorator";
import { CommandBase } from "../CommandBase";
import { Command } from "../CommandDecorator";
import { Terminal } from "../../logger/Terminal";
import { Zwip } from "../../Zwip";

@Command("stop", ["s"])
@Permission("zwip.stop")
export class CommandStop extends CommandBase {
  public execute(sender: CommandSender, args: string[]): void {
    Terminal.instance.info("Stopping Zwip...");
    Zwip.instance.botManager.unloadAll();
    Terminal.instance.info("Goodbye and see you next time !");
    setTimeout(() => {
      process.exit(0);
    }, 2000);
  }
}