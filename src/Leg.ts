import { abort, cliExecute, print } from "kolmafia";
import { get, set } from "libram";
import { stepProp } from "./constants";
import { Step } from "./Steps/Step";

export class Leg {
  constructor(name: string, steps: Step[]) {
    this.name = name;
    this.steps = steps;
  }

  run(): void {
    print(`Now working on leg ${this.name}`, "blue");

    this.steps.forEach((step: Step, index: number) => {
      const stepNum = index + 1;
      if (!this.isStepDone(stepNum)) {
        print(`On leg ${this.name}'s step #${stepNum}`, "blue");
        try {
          step.run();
          print(`Done with leg ${this.name}'s step #${stepNum}`);
          this.markStepDone(stepNum);
        } catch (error: unknown) {
          cliExecute("refresh all");
          print(`Error occurred during leg ${this.name}, step #${stepNum} (${step.name})`, "red");
          print(
            `If this step has actually been finished, enter 'set ${stepProp}=${stepNum}' in the gCLI and rerun loops`,
            "red"
          );
          if (typeof error === "string") {
            abort(error);
          } else {
            abort();
          }
        }
      }
    });

    print(`Completed leg ${this.name}`, "blue");
  }

  markStepDone(stepNum: number): void {
    if (!this.isStepDone(stepNum)) {
      set(stepProp, stepNum);
    }
  }

  isStepDone(stepNum: number): boolean {
    return get(stepProp, 0) >= stepNum;
  }

  name: string;
  steps: Step[];
}
