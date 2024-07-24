import { Terminal } from "../logger/Terminal";
import { Zwip } from "../Zwip";

export class ActionDeleteBot {
  public static run(id: string) {
    const botManager = Zwip.instance.botManager;

    if (!id) {
      Terminal.instance.error("Bot deletion failed. Id undefined.");
      return;
    }

    const bot = botManager.bots.find((b) => b.id === id);

    if (!bot) {
      Terminal.instance.error("Bot deletion failed. Bot not found.");
      return;
    }

    botManager.deleteBot(bot);
  }
}