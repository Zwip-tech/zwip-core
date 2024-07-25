import { CommandBase } from "./CommandBase";
import { CommandScanner } from "./CommandScanner";
import { CommandMetadata } from "./CommandMetadata";
import { getDecoratedCommands } from './CommandDecorator';
import { Terminal } from "../logger/Terminal";
import { TerminalSender } from "./TerminalSender";

import "./executors/CommandStop";
import "./executors/CommandBot";

export class CommandManager {
  private registeredCommands: CommandBase[];
  private terminal: Terminal;
  
  constructor(terminal: Terminal) {
    this.registeredCommands = [];
    this.terminal = terminal;
    this.scanAndRegisterCommands();
  }

  private async scanAndRegisterCommands() {
    // await CommandScanner.run();
    const commands = getDecoratedCommands();
    commands.forEach((commandMeta: CommandMetadata) => {
      this.registerCommand(commandMeta);
    });
  }

  public async handleCommand(rawInput: string) {

    if (rawInput.startsWith('!')) {
      rawInput = rawInput.replace('!', '');
    }
    const input = rawInput.split(' '); 
    const commandLabel = input.shift() || '';
    const args = input;
    const command = this.registeredCommands.find((c) => c.label === commandLabel || c.aliases.includes(commandLabel));
    if (!command) {
      this.terminal.error(`Command not found: ${commandLabel}`);
      return;
    }
    command.execute(new TerminalSender(), args);
  }
  
  public registerCommand(commandMeta: CommandMetadata) {
    this.registeredCommands.push(new commandMeta.target(commandMeta.label, commandMeta.aliases));
    this.terminal.debug(`Command registered: ${commandMeta.label}`);
  }

  get commands() {
    return this.commands;
  }
}