import { print } from "kolmafia";
import { get, Session, set } from "libram";
import { garboValue } from "garbage-collector/src/session";
import { CliStep } from "./Steps/CliStep";
import { itemProp, meatProp, voaSober } from "./constants";
import { Leg } from "./Leg";
import { LegRunner } from "./LegRunner";
import { handleDayStart, propertyManager } from "./props";
import { breakfast, pirateBellow } from "./Steps/Common/startupSteps";
import {
  drunkFarm,
  drunkFarmAscend,
  preSoberFarm,
  preSoberFarmAscend,
  soberFarm,
  soberFarmAscend,
} from "./Steps/Common/farmSteps";
import {
  clockworkMaid,
  florestizeBarfMountain,
  meatGolem,
  openRainDoh,
  pullAll,
  shrugBallad,
  visitGuildLeader,
  visitOldMan,
} from "./Steps/Common/setupSteps";
import {
  checkCasual,
  checkCS,
  checkRunFinished,
  ensureNoAdvs,
  ensureNoFites,
  melfAssert,
  softEnsureNoAdvs,
} from "./Steps/Common/safetyCheckSteps";
import {
  blackheart,
  drinkSweat,
  grabFusedFuse,
  melfDupe,
  nightcap,
  nightcapAscend,
} from "./Steps/Common/drunkSteps";
import { burnExcessFites, pvpPrep, runPvPFites, smashHippyCrap } from "./Steps/Common/pvpSteps";
import { ascendCasual, ascendCS } from "./Steps/Common/gashSteps";
import {
  buyOneDayTickets,
  cleanupInventory,
  refreshInv,
  smashBarrels,
  wadify,
} from "./Steps/Common/cleanupSteps";
import { FuncStep } from "./Steps/FuncStep";
import { checkCasualFinished, runCasual } from "./Steps/Common/casualSteps";

export function main(): void {
  handleDayStart();

  let session = Session.current();
  let sessionOutputted = false;

  const outputSession = () => {
    if (!sessionOutputted) {
      const sessionDiff = Session.current().diff(session);
      const results = sessionDiff.value(garboValue);

      const garboMeat = get("garboResultsMeat", 0);
      const garboItems = get("garboResultsItems", 0);
      const garboTotal = garboMeat + garboItems;

      const todayMeat = get(meatProp, 0) + results.meat;
      const todayItems = get(itemProp, 0) + results.items;
      const todayTotal = todayMeat + todayItems;

      set(meatProp, todayMeat);
      set(itemProp, todayItems);

      const formatNum = (num: number) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

      print("Today's garbo earnings so far...");
      print(`>  Meat: ${formatNum(garboMeat)}`);
      print(`> Items: ${formatNum(garboItems)}`);
      print(`> Total: ${formatNum(garboTotal)}`);
      print("Today's overall earnings so far...");
      print(`>  Meat: ${formatNum(todayMeat)}`);
      print(`> Items: ${formatNum(todayItems)}`);
      print(`> Total: ${formatNum(todayTotal)}`);

      sessionOutputted = true;
    }
  };

  const printSession = new FuncStep("Print Session Update", outputSession);

  const resetSession = new FuncStep("Reset Session Tracker", () => {
    session = Session.current();
    sessionOutputted = false;
  });

  const legRunner = new LegRunner([
    new Leg("Pre-Ascension", [
      breakfast,
      pirateBellow,
      shrugBallad,
      preSoberFarmAscend,
      soberFarmAscend,
      softEnsureNoAdvs,
      drinkSweat,
      nightcapAscend,
      blackheart,
      grabFusedFuse,
      drunkFarmAscend,
      ensureNoAdvs,
      pvpPrep,
      runPvPFites,
      ensureNoFites,
      refreshInv,
      printSession,
      ascendCS,
    ]),
    new Leg("Community Service", [
      checkCS,
      resetSession,
      new CliStep("PHCCS", "phccs"),
      checkRunFinished,
      visitOldMan,
      printSession,
      pullAll,
      resetSession,
      openRainDoh,
      breakfast,
      pirateBellow,
      preSoberFarmAscend,
      soberFarmAscend,
      softEnsureNoAdvs,
      drinkSweat,
      nightcapAscend,
      blackheart,
      melfAssert,
      melfDupe,
      grabFusedFuse,
      drunkFarmAscend,
      ensureNoAdvs,
      printSession,
      ascendCasual,
    ]),
    new Leg("Casual", [
      checkCasual,
      resetSession,
      smashHippyCrap,
      openRainDoh,
      visitGuildLeader,
      meatGolem,
      clockworkMaid,
      runCasual,
      checkCasualFinished,
      visitOldMan,
      breakfast,
      pirateBellow,
      florestizeBarfMountain,
      preSoberFarm,
      soberFarm,
      softEnsureNoAdvs,
      drinkSweat,
      nightcap,
      blackheart,
      melfAssert,
      melfDupe,
      grabFusedFuse,
      drunkFarm,
      burnExcessFites,
      refreshInv,
      buyOneDayTickets,
      smashBarrels,
      wadify,
      cleanupInventory,
      new CliStep("Prep For Rollover", "soologout"),
      printSession,
    ]),
  ]);

  try {
    propertyManager.set({ valueOfAdventure: voaSober });
    legRunner.run();
  } finally {
    propertyManager.resetAll();
    outputSession();
  }
}
