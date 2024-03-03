import * as serverline from "serverline";
import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";

export class Terminal {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
    this.initInputStream();
  }

  private initInputStream() {
    serverline.init({
      prompt: "→ "
    })
  }

  public debug(message: string) {
    this.logger.write(LogLevel.DEBUG, message);
  }

  public log(message: string) {
    this.logger.write(LogLevel.LOG, message);
  }

  public info(message: string) {
    this.logger.write(LogLevel.INFO, message);
  }

  public warn(message: string) {
    this.logger.write(LogLevel.WARN, message);
  }

  public error(message: string) {
    this.logger.write(LogLevel.ERROR, message);
  }

  public fatal(message: string) {
    this.logger.write(LogLevel.FATAL, message);
  }
}