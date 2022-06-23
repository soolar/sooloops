import { print } from "kolmafia";

export class Step {
  constructor(name: string) {
    this.name = name;
  }

  run(): void {
    this.startStep();
    this.stepBody();
    this.endStep();
  }

  startStep(): void {
    print(`Now running step ${this.name}...`, "blue");
  }

  stepBody(): void {
    throw new Error("Implement stepBody in extending class");
  }

  endStep(): void {
    print(`Now done with step ${this.name}!`, "blue");
  }

  name: string;
}
