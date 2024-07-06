import { Bot } from "./Bot";

export class BotManager {
  public bots: Bot[];

  constructor() {
    this.bots = [];
  }

  public registerBot(bot: Bot) {
    bot.start();
    this.bots.push(bot);
  }

  public getBot(id: string) {
    // return this.bots.find((b) => b.id === id);
  }

  public loadAll() {
    // Load all bots from disk
  }
}