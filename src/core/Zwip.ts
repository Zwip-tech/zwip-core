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
      this.terminal.log("Client is ready");
      this.terminal.log("Client is ready");
      this.terminal.log("Client is ready");
      this.terminal.log("Client is ready");
      this.terminal.log("Client is ready");
      this.terminal.log("Client is ready");
      this.terminal.debug("Client is ready");
      this.terminal.debug("Client is ready");
      this.terminal.debug("Client is ready");
      this.terminal.debug("Client is ready");
      this.terminal.debug("Client is ready");
      this.terminal.info("Client is ready");
      this.terminal.info("Client is ready");
      this.terminal.info("Client is ready");
      this.terminal.info("Client is ready");
      this.terminal.warn("Client is ready");
      this.terminal.warn("Client is ready");
      this.terminal.warn("Client is ready");
      this.terminal.warn("Client is ready");
      this.terminal.error("Client is ready");
      this.terminal.error("Client is ready");
      this.terminal.fatal("Client is ready");
      this.terminal.fatal("Client is ready");
      this.terminal.fatal("Client is ready");
      this.terminal.fatal("Client is ready");
    });

    client.login(Bun.env.TEMP_TESTBOT_TOKEN);
  }
}