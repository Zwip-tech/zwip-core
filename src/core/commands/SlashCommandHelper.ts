import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
import { Zwip } from "../Zwip";
import { Terminal } from "../logger/Terminal";

export class SlashCommandHelper {
  public static async registerGuildSlashCommands(slashCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[]): Promise<void> {
    const botManager = Zwip.instance.botManager;
    const masterBot = botManager.masterBot;
   
    if (!masterBot) {
      Terminal.instance.warn("Could not delete all guild commands. Master bot not found.");
      return;
    }

    if (!masterBot.client) {
      Terminal.instance.warn("Could not delete all guild commands. Master bot client not found.");
      return;
    }

    if (!masterBot.client.application) {
      Terminal.instance.warn("Could not delete all guild commands. Master bot application not found.");
      return;
    }

    const rest = new REST({ version: "10" }).setToken(botManager.masterBot.token);

    rest.put(Routes.applicationGuildCommands(botManager.masterBot.client?.application?.id, "1205916392134811658"), { body: slashCommands }).then(() => {
      Terminal.instance.debug("Slashes commands registered.");
    }).catch((error) => {
      Terminal.instance.error("Error while registering slash commands.");
      Terminal.instance.error(error);
    });
  }

  public static async deleteAllGuildCommands(): Promise<void> {
    const botManager = Zwip.instance.botManager;
    const masterBot = botManager.masterBot;

    if (!masterBot) {
      Terminal.instance.warn("Could not delete all guild commands. Master bot not found.");
      return;
    }

    if (!masterBot.client) {
      Terminal.instance.warn("Could not delete all guild commands. Master bot client not found.");
      return;
    }

    if (!masterBot.client.application) {
      Terminal.instance.warn("Could not delete all guild commands. Master bot application not found.");
      return;
    }

    const rest = new REST({ version: "10" }).setToken(botManager.masterBot.token);

    try {
      //! TODO: Remove hardcoded guild id
      await rest.put(Routes.applicationGuildCommands(masterBot.client.application?.id, "1205916392134811658"), { body: [] })
      Terminal.instance.debug(`Successfully deleted all guild commands for bot ${masterBot.client.user?.username}.`);
    } catch (error) {
      Terminal.instance.error("Error while deleting guild commands.");
    }
  }
}