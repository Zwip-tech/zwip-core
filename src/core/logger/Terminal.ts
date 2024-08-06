import * as serverline from "serverline";
import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";
import { Zwip } from "../Zwip";

export class Terminal {
  private readonly logger: Logger;
  public static instance: Terminal;

  constructor() {
    Terminal.instance = this;
    this.logger = new Logger();
    this.initInputStream();
  }

  private initInputStream() {
    serverline.init({
      prompt: "→ "
    });

    serverline.on("line", (line: string) => {
      Zwip.instance.commandManager.handleCommand(line);
    });
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

  get serverline() {
    return serverline;
  }
}