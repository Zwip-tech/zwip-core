import { Terminal } from "../logger/Terminal";
import { Zwip } from "../Zwip";

export class ActionStopBot {
  public static run(id: string): void {
    const bot = Zwip.instance.botManager.bots.find((b) => b.id === id);

    if (!bot) {
      Terminal.instance.error(`Cannot stop bot ${id}. Bot not found.`);
      return;
    }

    bot.stop();
  }
}