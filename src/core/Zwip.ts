import { Terminal } from "./logger/Terminal";
import { BotManager } from "./bot/BotManager";
import { PluginLoader} from "./plugins/PluginLoader";

export class Zwip {
  public terminal: Terminal;
  public botManager: BotManager;
  private pluginLoader: PluginLoader;
  
  public static instance: Zwip;
  
  constructor() {
    Zwip.instance = this;
    this.terminal = new Terminal();
    this.botManager = new BotManager();
    this.pluginLoader = new PluginLoader();
  }

  public run() {
    this.terminal.info("Starting Zwip...");
    this.botManager.loadAll().then(() => {
      this.terminal.info("All bots loaded.");
      this.terminal.info("Loading plugins...");
      this.pluginLoader.loadAll().then(() => {
        this.terminal.info("All plugins loaded.");
        this.terminal.info("Zwip is now running.");
      });
    });
  }
}