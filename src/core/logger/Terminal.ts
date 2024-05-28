import * as serverline from "serverline";
import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";
import { getDecoratedCommands } from '../commands/CommandDecorator';

import { CommandScanner } from "../commands/CommandScanner";
import { CommandMetadata } from "../commands/CommandMetadata";

export class Terminal {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
    this.initInputStream();
    this.registerCommands();
  }

  private async registerCommands() {
    await CommandScanner.run();
    const commands = getDecoratedCommands();

    commands.forEach((command: CommandMetadata) => {
      this.info(`Command registered: ${command.name}`);
    });
  }

  private initInputStream() {
    serverline.init({
      prompt: "→ "
    });

    serverline.on("line", (line: string) => {
      this.info(line);
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