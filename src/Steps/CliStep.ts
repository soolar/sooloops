import { cliExecute } from "kolmafia";
import { Step } from "./Step";

export const tryCliExecute = (command: string): void => {
  if (!cliExecute(command)) {
    throw `Something went wrong while running '${command}'`;
  }
};

export class CliStep extends Step {
  constructor(name: string, command: string) {
    super(name);
    this.command = command;
  }

  stepBody(): void {
    tryCliExecute(this.command);
  }

  command: string;
}
