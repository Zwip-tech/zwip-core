import 'reflect-metadata';
import { CommandMetadata } from './CommandMetadata';

const COMMANDS_METADATA_KEY = 'commands';

export const Command = (label: string, aliases: string[], isSlashCommand = true): ClassDecorator => {
  return (target: unknown) => {
    const existingCommands: CommandMetadata[] = Reflect.getMetadata(COMMANDS_METADATA_KEY, Reflect) || [];
    const commandMetadata = { label, aliases, isSlashCommand, target };
    Reflect.defineMetadata(COMMANDS_METADATA_KEY, [...existingCommands, commandMetadata], Reflect);
  };
}

export const getDecoratedCommands = (): CommandMetadata[] => {
  return Reflect.getMetadata(COMMANDS_METADATA_KEY, Reflect) || [];
}