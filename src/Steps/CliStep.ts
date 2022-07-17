import { cliExecute } from "kolmafia";
import { Step } from "./Step";

export const tryCliExecute = (command: string): void => {
  try {
    cliExecute(command);
  }
  catch (e: unknown) {
    if (typeof(e) !== "string") {
      throw `Something mysterious went wrong while running '${command}': ${e}`;
    }
    else if (e.indexOf("No matching CCS found!") < 0) {
      throw `Something went wrong while running '${command}: ${e}`;
    }
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
