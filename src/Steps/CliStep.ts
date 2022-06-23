import { cliExecute } from "kolmafia";
import { Step } from "./Step";

export class CliStep extends Step {
  constructor(name: string, command: string) {
    super(name);
    this.command = command;
  }

  stepBody(): void {
    if (!cliExecute(this.command)) {
      throw `Something went wrong while running '${this.command}'`;
    }
  }

  command: string;
}
