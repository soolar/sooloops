import { print, todayToString } from "kolmafia";
import { get, PropertiesManager, set } from "libram";
import { dayProp, isHalloween, itemProp, legProp, meatProp, stepProp } from "./constants";

export const propertyManager = new PropertiesManager();

export function handleDayStart(): void {
  if (get(dayProp, "") !== todayToString()) {
    print("Beginning sooloops for the day!", "blue");
    if (isHalloween) {
      print("It's Halloween! Have fun making mad bank!", "blue");
    }
    set(stepProp, 0);
    set(legProp, 0);
    set(dayProp, todayToString());
    set(meatProp, 0);
    set(itemProp, 0);
  }
}
