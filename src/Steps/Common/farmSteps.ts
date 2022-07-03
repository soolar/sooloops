import { print, useFamiliar } from "kolmafia";
import { $familiar } from "libram";
import { isHalloween, voaDrunk, voaSober } from "../../constants";
import { propertyManager } from "../../props";
import { CliStep, tryCliExecute } from "../CliStep";
import { FuncStep } from "../FuncStep";

const nonHalloweenPrep = new FuncStep("Non-Halloween Prep", () =>
  print("Nothing to do here for now, just keeping step count consistent with Halloween...")
);

export const preSoberFarm = isHalloween
  ? new CliStep("Final Garboween", "garboween")
  : nonHalloweenPrep;

export const preSoberFarmAscend = isHalloween
  ? new CliStep("Garboween", "garboween ascend")
  : nonHalloweenPrep;

const goFreecandy = () => {
  useFamiliar($familiar`Reagnimated Gnome`);
  tryCliExecute("freecandy");
};

export const soberFarmAscend = isHalloween
  ? new FuncStep("Sober Freecandy", goFreecandy)
  : new CliStep("Sober Garbo", "garbo ascend yachtzeechain");

export const soberFarm = isHalloween
  ? new FuncStep("Final Sober Freecandy", goFreecandy)
  : new CliStep("Final Sober Garbo", "garbo yachtzeechain");

export const drunkFarmAscend = isHalloween
  ? new FuncStep("Drunk Freecandy", goFreecandy)
  : new FuncStep("Drunk Garbo", () => {
      propertyManager.set({ valueOfAdventure: voaDrunk });
      tryCliExecute("garbo ascend");
      propertyManager.set({ valueOfAdventure: voaSober });
    });

export const drunkFarm = isHalloween
  ? drunkFarmAscend
  : new FuncStep("Non-Ascending Drunk Farm", () =>
      print("Doing nothing here, this step is for special occasions like Halloween.")
    );
