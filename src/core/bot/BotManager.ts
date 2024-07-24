import { Terminal } from "../logger/Terminal";
import { Bot } from "./Bot";
import { mkdir, readdir } from "node:fs/promises";

export class BotManager {
  private static readonly  BOTS_FOLDER = "./bots";
  public bots: Bot[];

  constructor() {
    this.bots = [];
  }

  public registerBot(bot: Bot) {
    if (this.exists(bot.token)) {
      Terminal.instance.error(`Bot registration failed. Token already in use. (${bot.token})`);
      return;
    }
    bot.start();
    this.bots.push(bot);
  }

  public getBot(id: string) {
    return this.bots.find((b) => b.id === id);
  }

  public exists(token: string) {
    return this.bots.find((b) => b.token === token);
  }

  public async loadAll() {
    const directoryExists = await readdir(BotManager.BOTS_FOLDER).catch(() => false);

    if (!directoryExists) {
      await mkdir(BotManager.BOTS_FOLDER, { recursive: true });
    }

    const botFiles = await readdir(BotManager.BOTS_FOLDER);

    for (const file of botFiles) {
      const json = await Bun.file(`${BotManager.BOTS_FOLDER}/${file}`).text();
      const botStub = JSON.parse(json);
      const bot = new Bot(botStub.id, botStub.token);
      this.registerBot(bot);
    }
  }

  public async saveBot(bot: Bot) {
    const directoryExists = await readdir(BotManager.BOTS_FOLDER).catch(() => false);

    if (!directoryExists) {
      await mkdir(BotManager.BOTS_FOLDER, { recursive: true });
    }

    Bun.write(`${BotManager.BOTS_FOLDER}/${bot.id}.json`, bot.toJSON());
  }
}