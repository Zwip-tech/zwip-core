import { Client, GatewayIntentBits, Events } from "discord.js";
import { Terminal } from "./logger/Terminal";

export class Zwip {
  public terminal: Terminal;
  public instance: Zwip;

  constructor() {
    this.instance = this;
    this.terminal = new Terminal();
  }

  public run() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.on(Events.ClientReady, () => {
      // Bot is ready
    });

    client.login(Bun.env.TEMP_TESTBOT_TOKEN);
  }
}