import { Zwip } from "../Zwip";
import { Bot } from "../bot/Bot";
import { ZwipIdGenerator } from "../generators/ZwipIdGenerator";
import { Terminal } from "../logger/Terminal";

export class ActionCreateBot {
  public static run(token: string) {
    const botManager = Zwip.instance.botManager;

    if (!token) {
      Terminal.instance.error("Bot creation failed. Token undefined.");
      return;
    }

    if (botManager.bots.find((b) => b.token === token)) {
      Terminal.instance.error("Bot creation failed. Token already in use.");
      return;
    }

    const id = ZwipIdGenerator.generate();
    const bot = new Bot(id, token);
    
    botManager.registerBot(bot);
    botManager.saveBot(bot);
    Terminal.instance.info(`Bot created with id: ${id}`);
  }
}