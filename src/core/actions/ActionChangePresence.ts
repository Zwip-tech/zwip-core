import { PresenceStatusData } from "discord.js";
import { Zwip } from "../Zwip";
import { Terminal } from "../logger/Terminal";

export class ActionChangePresence {
    public static run(id: string, presence: PresenceStatusData = "online"): void {
      const botManager = Zwip.instance.botManager;

      if (!id) {
        Terminal.instance.error("Bot presence change failed. Id undefined.");
        return;
      }

      const bot = botManager.bots.find((b) => b.id === id);

      if (!bot) {
        Terminal.instance.error("Bot presence change failed. Bot not found.");
        return;
      }

      bot.presence = presence;
      bot.client?.user?.setPresence({ status: presence });
      botManager.saveBot(bot);
    }
}