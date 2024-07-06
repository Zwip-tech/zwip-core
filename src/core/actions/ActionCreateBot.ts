import { Zwip } from "../Zwip";
import { Bot } from "../bot/Bot";
import { ZwipIdGenerator } from "../generators/ZwipIdGenerator";
import { Terminal } from "../logger/Terminal";

export class ActionCreateBot {
  public static run(token: string) {
    // Create a new bot
    if (!token) {
      throw new Error("Invalid token.");
    }

    const id = ZwipIdGenerator.generate();
    const bot = new Bot(id, token);
    
    Zwip.instance.botManager.registerBot(bot);
    Terminal.instance.info(`Bot created with id: ${id}`);
  }
}