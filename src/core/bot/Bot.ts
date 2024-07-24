import { Client, GatewayIntentBits, Events, ActivityType } from "discord.js";
import { Terminal } from "../logger/Terminal";

export class Bot {
  public id: string;
  public isMaster: boolean;
  public token: string;
  private client?: Client;

  public constructor(id: string, token: string) {
    this.id = id;
    this.isMaster = false;
    this.token = token;
    this.client = undefined;
  }

  public start() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });

    this.client.on(Events.ClientReady, () => {
      Terminal.instance.info(`Bot ${this.id} is loaded and ready to go!`);
      this.client?.user?.setPresence({ status: "dnd" })
      this.client?.user?.setActivity("Made with Zwip", { type: ActivityType.Custom });
    });

    this.client.login(this.token);
  }

  public async stop() {
    await this.client?.destroy();
    this.client = undefined;
  }

  public restart() {
    this.stop();
    this.start();
  }

  public get name() {
    return this.client?.user?.username ?? this.id;
  }

  public toJSON() {
    return  JSON.stringify({
      id: this.id,
      token: this.token
    });
  }
}