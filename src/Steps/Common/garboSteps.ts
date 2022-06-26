import { cliExecute } from "kolmafia";
import { voaDrunk, voaSober } from "../../constants";
import { propertyManager } from "../../props";
import { CliStep } from "../CliStep";
import { FuncStep } from "../FuncStep";

export const soberGarboAscend = new CliStep("Sober Garbo", "garbo ascend yachtzeechain");

export const drunkGarboAscend = new FuncStep("Drunk Garbo", () => {
  propertyManager.set({ valueOfAdventure: voaDrunk });
  cliExecute("garbo ascend");
  propertyManager.set({ valueOfAdventure: voaSober });
});

export const soberGarbo = new CliStep("Sober Garbo", "garbo yachtzeechain");
