import { ActionCreateBot } from "../../actions/ActionCreateBot";
import { ActionDeleteBot } from "../../actions/ActionDeleteBot";
import { ActionChangePresence } from "../../actions/ActionChangePresence";
import { ActionListBot } from "../../actions/ActionListBots";
import { CommandBase } from "../CommandBase";
import { Command } from "../CommandDecorator";
import { Terminal } from "../../logger/Terminal";
import { ChatInputCommandInteraction, PresenceStatusData, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";
import { Zwip } from "../../Zwip";

@Command("bot", ["b"])
export class CommandBot extends CommandBase {
    public buildSlashCommand(): RESTPostAPIChatInputApplicationCommandsJSONBody | null {
        return new SlashCommandBuilder().setName("bot")
          .setDescription("Manage bots")
          .addSubcommand(subcommand =>
            subcommand
              .setName("list")
              .setDescription("List all bots")
          ).addSubcommand(subcommand => 
            subcommand
            .setName("presence")
            .setDescription("Change bot presence")
            .addUserOption(option => option.setName("user").setDescription("The bot ID").setRequired(true))
            .addStringOption(option => option.setName("presence").setDescription("The presence status").setRequired(true)))
          .toJSON();
    }

    public executeSlashCommand(interaction: ChatInputCommandInteraction): void {
      const subcommand = interaction.options.getSubcommand();
      switch (subcommand) {
        case "list":
          const embed = ActionListBot.run(true);

          if (embed) {
            interaction.reply({ embeds: [embed], ephemeral: true });
          }
          break;
        case "presence":
          const user = interaction.options.getUser("user");
          
          if (!user) {
            interaction.reply({content: "Invalid user", ephemeral: true });
            return;
          }
          
          const bot = Zwip.instance.botManager.getBotByUsername(user.username);

          if (!bot) {
            interaction.reply({content: "Bot not found", ephemeral: true });
            return;
          }

          const presence = interaction.options.getString("presence") as PresenceStatusData;
          ActionChangePresence.run(bot.id, presence);
          interaction.reply({content: `Presence changed to ${presence}`, ephemeral: true });
          break;
        default:
          Terminal.instance.error("Not implemented yet");
          break;
      }
    }

    public executeTerminalCommand(args: string[]): void {
      if (args.length < 1) {
        Terminal.instance.error("Not implemented yet");
        return;
      }

      switch (args[0]) {
        case "list":
          ActionListBot.run();
          break
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