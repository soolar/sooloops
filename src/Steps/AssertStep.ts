import { abort } from "kolmafia";
import { Step } from "./Step";

export class AssertStep extends Step {
  constructor(name: string, predicate: () => boolean, errorMessage: string) {
    super(name);
    this.predicate = predicate;
    this.errorMessage = errorMessage;
  }

  stepBody(): void {
    if (!this.predicate()) {
      abort(`${this.errorMessage}\nSomething went wrong!`);
    }
  }

  predicate: () => boolean;
  errorMessage: string;
}
