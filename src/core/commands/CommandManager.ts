import { CommandBase } from "./CommandBase";
import { CommandMetadata } from "./CommandMetadata";
import { getDecoratedCommands } from './CommandDecorator';
import { Terminal } from "../logger/Terminal";

import "./executors/CommandStop";
import "./executors/CommandBot";
import "./executors/CommandPlugins";

export class CommandManager {
  public registeredCommands: CommandBase[];
  private terminal: Terminal;

  private static COMMAND_MARKER = '!';
  
  constructor() {
    this.registeredCommands = [];
    this.terminal = Terminal.instance;
  }

  public registerInternalCommands() {
    const commands = getDecoratedCommands();
    commands.forEach((commandMeta: CommandMetadata) => {
      this.registerCommand(commandMeta);
    });
  }

  public async handleCommand(rawInput: string) {
    if (rawInput.startsWith(CommandManager.COMMAND_MARKER)) {
      rawInput = rawInput.replace(CommandManager.COMMAND_MARKER, '');
    }
    const input = rawInput.split(' ');
    const commandLabel = input.shift() || '';
    const args = input;
    const command = this.registeredCommands.find((c) => c.label === commandLabel || c.aliases.includes(commandLabel));
    if (!command) {
      this.terminal.error(`Command not found: ${commandLabel}`);
      return;
    }
    command.executeTerminalCommand(args);
  }
  
  public registerCommand(commandMeta: CommandMetadata) {
    this.registeredCommands.push(new commandMeta.target(commandMeta.label, commandMeta.aliases));
    this.terminal.debug(`Registered command: ${commandMeta.label}`);
  }
}