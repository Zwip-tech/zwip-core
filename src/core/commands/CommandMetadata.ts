import { CommandBase } from "./CommandBase";

export interface CommandMetadata {
  label: string;
  aliases: string[];
  isSlashCommand: boolean;
  target: new (label: string, aliases: string[]) => CommandBase;
}