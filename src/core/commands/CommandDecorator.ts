import 'reflect-metadata';
import { CommandMetadata } from './CommandMetadata';

const COMMANDS_METADATA_KEY = 'commands';

export const Command = (name: string): ClassDecorator => {
  return (target: unknown) => {
    const existingCommands: CommandMetadata[] = Reflect.getMetadata(COMMANDS_METADATA_KEY, Reflect) || [];
    const commandMetadata = { name, target };
    Reflect.defineMetadata(COMMANDS_METADATA_KEY, [...existingCommands, commandMetadata], Reflect);
  };
}

export const getDecoratedCommands = (): CommandMetadata[] => {
  return Reflect.getMetadata(COMMANDS_METADATA_KEY, Reflect) || [];
}