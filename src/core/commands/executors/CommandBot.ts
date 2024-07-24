import { ActionCreateBot } from "../../actions/ActionCreateBot";
import { ActionDeleteBot } from "../../actions/ActionDeleteBot";
import { Permission } from "../../permissions/PermissionDecorator";
import { CommandBase } from "../CommandBase";
import { Command } from "../CommandDecorator";
import { CommandSender } from "../CommandSender";
import { Terminal } from "../../logger/Terminal";

@Command("bot", ["b"])
@Permission("zwip.bot")
export class CommandBot extends CommandBase {
    public execute(sender: CommandSender, args: string[]): void {
      if (args.length < 1) {
        Terminal.instance.error("Not implemented yet");
        return;
      }

      switch (args[0]) {
        case "create":
          if (args.length < 2) {
            Terminal.instance.error("Invalid usage: !bot create <token>");
            return;
          }
          ActionCreateBot.run(args[1]);
            break;
        case "delete":
          if (args.length < 2) {
            Terminal.instance.error("Invalid usage: !bot delete <id>");
            return;
          }
          ActionDeleteBot.run(args[1]);
          return;
        default:
          throw new Error("Invalid usage: !bot create <token>");
      }
    }
}