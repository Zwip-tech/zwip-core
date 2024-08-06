import { Client, GatewayIntentBits, Events, ActivityType, PresenceStatusData, RESTPostAPIChatInputApplicationCommandsJSONBody, Message } from "discord.js";
import { Terminal } from "../logger/Terminal";
import { Zwip } from "../Zwip";
import { REST, Routes } from "discord.js";

export class Bot {
  public id: string;
  public isMaster: boolean;
  public token: string;
  public client?: Client;
  public presence: PresenceStatusData;

  public constructor(id: string, token: string, presence?: PresenceStatusData) {
    this.id = id;
    this.presence = presence ?? 'online';
    this.isMaster = false;
    this.token = token;
    this.client = undefined;
  }

  public async start() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    this.client.once(Events.ClientReady, async() => {
      if (!this.client) {
        Terminal.instance.fatal("Client is undefined.");
        return;
      }

      if (!this.client.user) {
        Terminal.instance.fatal("User is undefined.");
        return;
      }

      if (!this.client.application) {
        Terminal.instance.fatal("Application is undefined.");
        return;
      } 

      this.client.user.setPresence({ status: this.presence });
      this.client.user.setActivity("Made with Zwip", { type: ActivityType.Custom });
      
      const rest = new REST({ version: "10" }).setToken(this.token);

      try {
        //! TODO: Remove hardcoded guild id
        await rest.put(Routes.applicationGuildCommands(this.client.application.id, "1205916392134811658"), { body: [] })
        Terminal.instance.debug(`Successfully deleted all guild commands for bot ${this.client.user.username}.`);
      } catch (error) {
        Terminal.instance.error("Error while deleting guild commands.");
      }

      if (this.isMaster) {
        let jsonSlashCommand;
        const commandManager = Zwip.instance.commandManager;
        const slashCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

        for (const command of commandManager.registeredCommands) {
          jsonSlashCommand = command.buildSlashCommand();

          if (!jsonSlashCommand) {
            Terminal.instance.debug(`Ignoring Slash Command registration for command: ${command.label}`);
            continue;
          }
          slashCommands.push(jsonSlashCommand)
        }

        //! TODO: Remove hardcoded guild id
        rest.put(Routes.applicationGuildCommands(this.client.application.id, "1205916392134811658"), { body: slashCommands }).then(() => {
          Terminal.instance.debug("Slashes commands registered."); 
        }).catch((error) => {
          Terminal.instance.error("Error while registering slash commands.");
          Terminal.instance.error(error);
        });

        const eventManager = Zwip.instance.eventManager;

        eventManager.registerBotEvent(Events.MessageCreate, (message: Message) => {
        }, "bot");
        eventManager.botEvents.forEach((events, namespace) => {
          Terminal.instance.debug(`Registering events for namespace: ${namespace}`);
          events.forEach((listener) => {
            Terminal.instance.debug(`Registering event: ${listener.event}`);
            this.client?.on(listener.event, listener.callback);
          });
        });
      }
      Terminal.instance.info(`Bot ${this.id} is loaded and ready!`);
    });

    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const commandManager = Zwip.instance.commandManager;
      const command = commandManager.registeredCommands.find((c) => c.label === interaction.commandName);

      if (!command) {
        Terminal.instance.error(`Command not found: ${interaction.commandName}`);
        return;
      }
      command.executeSlashCommand(interaction);
      Terminal.instance.info(`User ${interaction.user.username} (${interaction.user.id}) executed command: ${interaction.commandName}`);
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
      token: this.token,
      presence: this.presence
    });
  }
}