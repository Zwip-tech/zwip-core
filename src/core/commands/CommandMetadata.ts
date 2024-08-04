import { CommandBase } from "./CommandBase";

export interface CommandMetadata {
  label: string;
  aliases: string[];
  target: new (label: string, aliases: string[]) => CommandBase;
}