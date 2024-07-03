import { Terminal } from "./logger/Terminal";
import { BotManager } from "./bot/BotManager";
import { Bot } from "./bot/Bot";

export class Zwip {
  public terminal: Terminal;
  public botManager: BotManager;
  
  public static instance: Zwip;
  constructor() {
    Zwip.instance = this;
    this.terminal = new Terminal();
    this.botManager = new BotManager();
  }

  public run() {
    this.terminal.info("Starting Zwip...");
    this.botManager.loadAll();
  }
}