import { EmbedBuilder } from "discord.js";
import { Terminal } from "../logger/Terminal";
import { Zwip } from "../Zwip";

export class ActionListBot {
  public static run(embed: boolean = false): void | EmbedBuilder {
    if (!embed) {
      this.displayTerminal();
    } else {
      return this.buildEmbed();
    }
  }

  private static buildEmbed(): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle("Bot list")

    for (const bot of Zwip.instance.botManager.bots) {
      embed.addFields({ name: `ID: ${bot.id}`, value: `Username: ${bot.name} | Presence: ${bot.presence}` });
    }
    return embed;
  }

  private static displayTerminal(): void {
    const botManager = Zwip.instance.botManager;

    Terminal.instance.info(`There is ${botManager.bots.length} bot(s) available:`);

    botManager.bots.forEach((bot) => {
      Terminal.instance.info(`ID: ${bot.id} | Username: ${bot.name} | Presence: ${bot.presence}`);
    });
    Terminal.instance.info("Use !bot create <token> to create a new bot");
  }
}