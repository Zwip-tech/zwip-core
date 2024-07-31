import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';

const TS_EXTENSION = '.ts';
const COMMANDS_PATH = join(__dirname, '..', 'commands/executors');

export class CommandScanner {
  public static async run(): Promise<void> {
    await this.scanDirectory(COMMANDS_PATH);
  }

  private static async scanDirectory(directory: string): Promise<void> {
    const files = readdirSync(directory);
    for (const file of files) {
      const path = join(directory, file);
      
      if (path.endsWith(TS_EXTENSION)) {
        await import(path);
      } else if (lstatSync(path).isDirectory()) {
        await this.scanDirectory(path);
      }
    }
  }
}