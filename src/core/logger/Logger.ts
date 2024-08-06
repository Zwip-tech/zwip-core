import chalk from "chalk";
import { LogLevel } from "./LogLevel";

+LogLevel // Fix Bun bundle error https://github.com/oven-sh/bun/issues/12805

export class Logger {
  public write(level: LogLevel, message: string) {
    switch (level) {
      case LogLevel.DEBUG:
        console.log(`${chalk.gray(this.buildDateMessage())} ${chalk.bgHex('#ff9ff3').whiteBright(`[${LogLevel[level]}]`)}  ${chalk.reset(message)}`);
        break;
      case LogLevel.LOG:
        console.log(`${chalk.gray(this.buildDateMessage())} ${chalk.bgHex('#8395a7').whiteBright(`[${LogLevel[level]}]`)}    ${chalk.reset(message)}`);
        break;
      case LogLevel.INFO:
        console.log(`${chalk.gray(this.buildDateMessage())} ${chalk.bgHex('#54a0ff').whiteBright(`[${LogLevel[level]}]`)}   ${chalk.reset(message)}`);
        break;
      case LogLevel.WARN:
        console.log(`${chalk.gray(this.buildDateMessage())} ${chalk.bgHex('#f6b93b').whiteBright(`[${LogLevel[level]}]`)}   ${chalk.reset(message)}`);
        break;
      case LogLevel.ERROR:
        console.log(`${chalk.gray(this.buildDateMessage())} ${chalk.bgHex('#e55039').whiteBright(`[${LogLevel[level]}]`)}  ${chalk.reset(message)}`);
        break;
      case LogLevel.FATAL:
        console.log(`${chalk.gray(this.buildDateMessage())} ${chalk.bgHex('#eb2f06').whiteBright(`[${LogLevel[level]}]`)}  ${chalk.reset(message)}`);
        break;
    }
  }

  private buildDateMessage() {
    const date = new Date();
    const pad = (num: number): string => num < 10 ? `0${num}` : `${num}`;

     return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }
}