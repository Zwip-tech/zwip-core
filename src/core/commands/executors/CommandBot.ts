import { ActionCreateBot } from "../../actions/ActionCreateBot";
import { Permission } from "../../permissions/PermissionDecorator";
import { CommandBase } from "../CommandBase";
import { Command } from "../CommandDecorator";
import { CommandSender } from "../CommandSender";

@Command("bot", ["b"])
@Permission("zwip.bot")
export class CommandBot extends CommandBase {
    public execute(sender: CommandSender, args: string[]): void {
      if (args.length < 1) {
        throw new Error("Not implemented yet.");
      }

      switch (args[0]) {
        case "create":
          ActionCreateBot.run(args[1]);
            break;
        default:
          throw new Error("Invalid usage: !bot create <token>");
      }
    }
}