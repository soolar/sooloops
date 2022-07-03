import {
  formatDateTime,
  numericModifier,
  pvpAttacksLeft,
  todayToString,
  toInt,
  visitUrl,
} from "kolmafia";
import { pvpPrepCommand, pvpStance } from "../../constants";
import { CliStep, tryCliExecute } from "../CliStep";
import { FuncStep } from "../FuncStep";

export const smashHippyCrap = new FuncStep("Smash Hippy Crap", () => {
  const smashText = visitUrl("peevpee.php?confirm=on&action=smashstone&pwd");
  if (smashText.indexOf("Pledge allegiance to") >= 0) {
    visitUrl("peevpee.php?action=pledge&place=fight&pwd");
  }
});

function todayIsPvPSeasonEnd(): boolean {
  const guaranteedEnds = ["0229", "0430", "0630", "0831", "1031", "1231"];
  const today = formatDateTime("yyyyMMdd", todayToString(), "MMdd");
  if (guaranteedEnds.indexOf(today) !== -1) {
    return true;
  }
  if (today === "0228") {
    // check for leap year
    const year = toInt(formatDateTime("yyyyMMdd", todayToString(), "yyyy"));
    if (year % 4 !== 0) {
      return true;
    }
    if (year % 100 !== 0) {
      return false;
    }
    return year % 400 !== 0;
  }
  return false;
}

export const burnExcessFites = new FuncStep("Burn Excess Fites", () => {
  if (todayIsPvPSeasonEnd()) {
    //abort("Is today really pvp season end? Make sure that function is working...");
    tryCliExecute(pvpPrepCommand);
    tryCliExecute(`pvp loot ${pvpStance}`);
  } else {
    tryCliExecute("soologout");
    const excessFites = pvpAttacksLeft() + 10 + numericModifier("PvP Fights") - 100;
    if (excessFites > 0) {
      tryCliExecute(pvpPrepCommand);
      tryCliExecute(`pvp ${excessFites} loot ${pvpStance}`);
    }
  }
});

export const pvpPrep = new CliStep("PvP Prep", pvpPrepCommand);
export const runPvPFites = new CliStep("PvP", `pvp loot ${pvpStance}`);
