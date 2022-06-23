import { Step } from "./Step";

export class FuncStep extends Step {
  constructor(name: string, func: () => void) {
    super(name);
    this.func = func;
  }

  stepBody(): void {
    this.func();
  }

  func: () => void;
}
