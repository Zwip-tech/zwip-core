import { Client, GatewayIntentBits, Events, ActivityType } from "discord.js";
import { Terminal } from "../logger/Terminal";

export class Bot {
  public id: string;
  public isMaster: boolean;
  public token: string;

  public constructor(id: string, token: string) {
    this.id = id;
    this.isMaster = false;
    this.token = token;
  }

  public start() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.on(Events.ClientReady, () => {
      Terminal.instance.info(`Bot ${this.id} is loaded and ready to go!`);
      client.user?.setPresence({ status: "dnd" })
      client.user?.setActivity("Made with Zwip", { type: ActivityType.Custom });
    });

    client.login(this.token);
  }

  public stop() {
    // Stop the bot
  }

  public restart() {
    // Restart the bot
  }

  public destroy() {
    // Destroy the bot
  }

  public toJSON() {
    return  JSON.stringify({
      id: this.id,
      token: this.token
    });
  }
}