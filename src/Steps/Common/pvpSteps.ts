import { cliExecute, numericModifier, pvpAttacksLeft, visitUrl } from "kolmafia";
import { pvpPrepCommand, pvpStance } from "../../constants";
import { CliStep } from "../CliStep";
import { FuncStep } from "../FuncStep";

export const smashHippyCrap = new FuncStep("Smash Hippy Crap", () => {
  const smashText = visitUrl("peevpee.php?confirm=on&action=smashstone&pwd");
  if (smashText.indexOf("Pledge allegiance to") >= 0) {
    visitUrl("peevpee.php?action=pledge&place=fight&pwd");
  }
});

export const burnExcessFites = new FuncStep("Burn Excess Fites", () => {
  cliExecute("soologout");
  const excessFites = pvpAttacksLeft() + 10 + numericModifier("PvP Fights") - 100;
  if (excessFites > 0) {
    cliExecute(pvpPrepCommand);
    cliExecute(`pvp ${excessFites} loot ${pvpStance}`);
  }
});

export const pvpPrep = new CliStep("PvP Prep", pvpPrepCommand);
export const runPvPFites = new CliStep("PvP", `pvp loot ${pvpStance}`);
