import { Terminal } from "../logger/Terminal";
import { Zwip } from "../Zwip";

export class ActionStopZwip {
  public static run(): void {
    Terminal.instance.info("Stopping Zwip...");
    Zwip.instance.botManager.unloadAll();
    Terminal.instance.info("Goodbye and see you next time !");
    setTimeout(() => {
      process.exit(0);
    }, 2000);
  }
}