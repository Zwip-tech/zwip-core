import { Terminal } from "../logger/Terminal";
import { Zwip } from "../Zwip";

export class ActionStopZwip {
  public static run(): void {
    Terminal.instance.info("Stopping Zwip...");
    Promise.all(Zwip.instance.botManager.unloadAll()).then(() => {
      Terminal.instance.info("All bots have been stopped.");
      Terminal.instance.info("Goodbye and see you next time !");
    })
    .catch((error) => {
      Terminal.instance.error(`Error while stopping Zwip: ${error.message}`);
    })
    .finally(() => {
      setTimeout(() => {
        process.exit(0);
      }, 1000);
    });
  }
}