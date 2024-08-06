import { Terminal } from "./logger/Terminal";
import { BotManager } from "./bot/BotManager";
import { CommandManager } from "./commands/CommandManager";
import { EventManager } from "./events/EventManager";
import { PluginManager } from "./plugins/PluginManager";

export class Zwip {
  public readonly terminal: Terminal;
  public readonly botManager: BotManager;
  public readonly commandManager: CommandManager;
  public readonly eventManager: EventManager;
  public readonly pluginManager: PluginManager;
  
  public static instance: Zwip;
  
  constructor() {
    Zwip.instance = this;

    this.terminal = new Terminal();
    this.eventManager = new EventManager();
    this.commandManager = new CommandManager();
    this.botManager = new BotManager();
    this.pluginManager = new PluginManager();
  }

  public async run() {
    this.terminal.info("Starting Zwip...");

    try {
      this.commandManager.registerInternalCommands();
      this.pluginManager.init();
      await this.botManager.loadAll();
    } catch (e: any) {
      this.terminal.error(`Error while loading Zwip: ${e.message}`);
      return;
    }
  }
}