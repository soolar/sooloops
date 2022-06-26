import { print } from "kolmafia";
import { get, Session, set } from "libram";
import { garboValue } from "garbage-collector/src/session";
import { CliStep } from "./Steps/CliStep";
import { itemProp, meatProp } from "./constants";
import { Leg } from "./Leg";
import { LegRunner } from "./LegRunner";
import { handleDayStart, propertyManager } from "./props";
import { breakfast, pirateBellow } from "./Steps/Common/startupSteps";
import { drunkGarboAscend, soberGarbo, soberGarboAscend } from "./Steps/Common/garboSteps";
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
} from "./Steps/Common/safetyCheckSteps";
import {
  blackheart,
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

export function main(): void {
  handleDayStart();

  const session = Session.current();

  const legRunner = new LegRunner([
    new Leg("Pre-Ascension", [
      breakfast,
      pirateBellow,
      shrugBallad,
      soberGarboAscend,
      ensureNoAdvs,
      nightcapAscend,
      blackheart,
      grabFusedFuse,
      drunkGarboAscend,
      ensureNoAdvs,
      pvpPrep,
      runPvPFites,
      ensureNoFites,
      ascendCS,
    ]),
    new Leg("Community Service", [
      checkCS,
      new CliStep("PHCCS", "phccs"),
      visitOldMan,
      pullAll,
      openRainDoh,
      breakfast,
      pirateBellow,
      soberGarboAscend,
      ensureNoAdvs,
      nightcapAscend,
      blackheart,
      melfAssert,
      melfDupe,
      grabFusedFuse,
      drunkGarboAscend,
      ensureNoAdvs,
      ascendCasual,
    ]),
    new Leg("Casual", [
      checkCasual,
      smashHippyCrap,
      openRainDoh,
      visitGuildLeader,
      meatGolem,
      clockworkMaid,
      new CliStep("Run Casual", "loopcasual"),
      checkRunFinished,
      visitOldMan,
      breakfast,
      pirateBellow,
      florestizeBarfMountain,
      soberGarbo,
      ensureNoAdvs,
      nightcap,
      blackheart,
      grabFusedFuse,
      melfAssert,
      melfDupe,
      burnExcessFites,
      refreshInv,
      buyOneDayTickets,
      smashBarrels,
      wadify,
      cleanupInventory,
      new CliStep("Prep For Rollover", "soologout"),
    ]),
  ]);

  try {
    legRunner.run();
  } finally {
    propertyManager.resetAll();

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

    print("Today's garbo earnings...");
    print(`>  Meat: ${formatNum(garboMeat)}`);
    print(`> Items: ${formatNum(garboItems)}`);
    print(`> Total: ${formatNum(garboTotal)}`);
    print("Today's overall earnings...");
    print(`>  Meat: ${formatNum(todayMeat)}`);
    print(`> Items: ${formatNum(todayItems)}`);
    print(`> Total: ${formatNum(todayTotal)}`);
  }
}
