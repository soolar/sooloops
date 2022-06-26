import { inCasual, myAdventures, myPath, pvpAttacksLeft } from "kolmafia";
import { $location, get } from "libram";
import { AssertStep } from "../AssertStep";

export const checkCS = new AssertStep(
  "Check Community Service",
  () => myPath() === "Community Service",
  "You should be on a Community Service run right now, but you aren't."
);

export const checkCasual = new AssertStep(
  "Check Casual",
  () => inCasual(),
  "You should be on a Casual run right now, but you aren't."
);

export const checkRunFinished = new AssertStep(
  "Check Run Finished",
  () => get("kingLiberated"),
  "You should have freed the king, but you haven't."
);

export const melfAssert = new AssertStep(
  "Melf Dupe Safety Check",
  () => $location`The Deep Machine Tunnels`.turnsSpent === 5,
  "You should have spent exactly 5 turns in The Deep Machine Tunnels, but you haven't. Something went wrong."
);

export const ensureNoAdvs = new AssertStep(
  "Check Advs",
  () => myAdventures() === 0,
  "You shouldn't have any adventures left, but you do."
);

export const ensureNoFites = new AssertStep(
  "Check Fites",
  () => pvpAttacksLeft() === 0,
  "You shouldn't have any pvp fights left, but you do."
);
