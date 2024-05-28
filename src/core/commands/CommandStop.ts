import { Command } from "./CommandDecorator";
import { CommandInterface } from "./CommandInterface";

@Command("stop")
export class CommandStop implements CommandInterface {
  public execute(): void {
    console.log("CommandStop executed");
  }
}