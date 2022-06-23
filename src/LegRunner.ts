import { print, todayToString } from "kolmafia";
import { get, set } from "libram";
import { dayProp, legProp, stepProp } from "./constants";
import { Leg } from "./Leg";

export class LegRunner {
  constructor(legs: Leg[]) {
    this.legs = legs;
  }

  run(): void {
    if (get(dayProp, "") !== todayToString()) {
      print("Beginning sooloops for the day!", "blue");
      set(stepProp, 0);
      set(legProp, 0);
      set(dayProp, todayToString());
    }

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
    }
  }

  isLegDone(legNum: number): boolean {
    return get(legProp, 0) >= legNum;
  }

  legs: Leg[];
}
