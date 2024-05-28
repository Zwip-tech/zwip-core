import { readdirSync } from 'fs';
import { join } from 'path';

const TS_EXTENSION = '.ts';
const COMMANDS_PATH = join(__dirname, '..', 'commands');

export class CommandScanner {
  public static async run(): Promise<void> {
    const files = readdirSync(COMMANDS_PATH);
    for (const file of files) {
      if (file.endsWith(TS_EXTENSION)) {
        const filePath = join(COMMANDS_PATH, file);

        await import(filePath);
      }
    }
  }
}