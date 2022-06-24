import { print } from "kolmafia";
import { get, set } from "libram";
import { legProp, stepProp } from "./constants";
import { Leg } from "./Leg";

export class LegRunner {
  constructor(legs: Leg[]) {
    this.legs = legs;
  }

  run(): void {
    if (this.isLegDone(this.legs.length + 1)) {
      print("You're already done for today!", "blue");
    } else {
      this.legs.forEach((leg: Leg, index: number) => {
        const legNum = index + 1;
        if (!this.isLegDone(legNum)) {
          print(`On leg #${legNum}`, "blue");
          leg.run();
          this.markLegDone(legNum);
        }
      });
    }
  }

  markLegDone(legNum: number): void {
    if (!this.isLegDone(legNum)) {
      set(legProp, legNum);
      set(stepProp, 0);
    }
  }

  isLegDone(legNum: number): boolean {
    return get(legProp, 0) >= legNum;
  }

  legs: Leg[];
}
