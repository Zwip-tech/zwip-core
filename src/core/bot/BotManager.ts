import { Terminal } from "../logger/Terminal";
import { Bot } from "./Bot";
import { mkdir, readdir, unlink } from "node:fs/promises";

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

    const isMaster = this.bots.length === 0;

    if (isMaster) {
      Terminal.instance.info(`Bot ${bot.id} is the master bot.`);
      bot.isMaster = this.bots.length === 0;
    }
    bot.start();
    this.bots.push(bot);
  }

  public unregisterBot(bot: Bot) {
    if (!bot) {
      Terminal.instance.error(`Bot unregistration failed. Bot undefined.`);
      return;
    }

    bot.stop();
    this.bots = this.bots.filter((b) => b.id !== bot.id);
  }

  public get masterBot() {
    return this.bots.find((b) => b.isMaster);
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
      const bot = new Bot(botStub.id, botStub.token, botStub.presence);
      this.registerBot(bot);
    }
  }

  public async unloadAll() {
    Terminal.instance.debug("Unloading all bots...");
    for (const bot of this.bots) {
      this.unregisterBot(bot);
    }
  }

  public async saveBot(bot: Bot) {
    const directoryExists = await readdir(BotManager.BOTS_FOLDER).catch(() => false);

    if (!directoryExists) {
      await mkdir(BotManager.BOTS_FOLDER, { recursive: true });
    }

    Bun.write(`${BotManager.BOTS_FOLDER}/${bot.id}.json`, bot.toJSON());
  }

  public async deleteBot(bot: Bot) {
    this.unregisterBot(bot);
    await unlink(`${BotManager.BOTS_FOLDER}/${bot.id}.json`);
    Terminal.instance.info(`Bot deleted with id: ${bot.id}`);
  }
}