import { ActionCreateBot } from "../../actions/ActionCreateBot";
import { ActionDeleteBot } from "../../actions/ActionDeleteBot";
import { Permission } from "../../permissions/PermissionDecorator";
import { CommandBase } from "../CommandBase";
import { Command } from "../CommandDecorator";
import { CommandSender } from "../CommandSender";
import { Terminal } from "../../logger/Terminal";
import { ActionChangePresence } from "../../actions/ActionChangePresence";

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
          break;
        case "presence":
          if (args.length < 3) {
            Terminal.instance.error("Invalid usage: !bot presence <id> <online|dnd|idle|offline>");
            return;
          }

          if (args[2] !== "online" && args[2] !== "dnd" && args[2] !== "idle" && args[2] !== "invisible") {
            Terminal.instance.error("Invalid usage: !bot presence <id> <online|dnd|idle|invisible>");
            return;
          }

          ActionChangePresence.run(args[1], args[2]);
          break;
        default:
          throw new Error("Invalid usage: !bot create <token>");
      }
    }
}