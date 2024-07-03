import { Client, GatewayIntentBits, Events, ActivityType } from "discord.js";

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
      // Bot is ready
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
}