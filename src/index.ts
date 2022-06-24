import {
  adv1,
  availableAmount,
  buy,
  cliExecute,
  Coinmaster,
  equip,
  inCasual,
  isAccessible,
  itemAmount,
  myAdventures,
  myPath,
  numericModifier,
  print,
  putCloset,
  putShop,
  pvpAttacksLeft,
  sellPrice,
  sellsItem,
  takeCloset,
  toInt,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import {
  $class,
  $familiar,
  $item,
  $items,
  $location,
  $slot,
  ascend,
  get,
  Lifestyle,
  Paths,
  Session,
  set,
} from "libram";
import { garboValue } from "garbage-collector/src/session";
import { AssertStep } from "./Steps/AssertStep";
import { CliStep } from "./Steps/CliStep";
import { melfDupeItem, pvpStance, voaDrunk, voaSober } from "./constants";
import { FuncStep } from "./Steps/FuncStep";
import { Leg } from "./Leg";
import { LegRunner } from "./LegRunner";

export function main(): void {
  let session = Session.current();
  const addToSession = new FuncStep(
    "Update Session",
    () => (session = session.add(Session.current()))
  );

  const breakfast = new CliStep("Breakfast", "breakfast");

  const pirateBellow = new CliStep("Pirate Bellow", "cast Pirate Bellow");

  const setVoaSober = new FuncStep("Sober VoA", () => set("valueOfAdventure", voaSober));
  const setVoaDrunk = new FuncStep("Drunk VoA", () => set("valueOfAdventure", voaDrunk));

  const soberGarboAscend = new CliStep("Sober Garbo", "garbo ascend yachtzeechain");
  const drunkGarboAscend = new CliStep("Drunk Garbo", "garbo ascend");
  const soberGarbo = new CliStep("Sober Garbo", "garbo yachtzeechain");

  const ensureNoAdvs = new AssertStep(
    "Check Advs",
    () => myAdventures() === 0,
    "You shouldn't have any adventures left, but you do."
  );

  const ensureNoFites = new AssertStep(
    "Check Fites",
    () => pvpAttacksLeft() === 0,
    "You shouldn't have any pvp fights left, but you do."
  );

  const blackheart = new FuncStep("Blackheart", () => {
    if (!get("_interviewMasquerade") && availableAmount($item`plastic vampire fangs`) > 0) {
      equip($slot`off-hand`, $item`Drunkula's wineglass`);
      equip($slot`acc3`, $item`plastic vampire fangs`);
      visitUrl("place.php?whichplace=town&action=town_vampout");
      cliExecute("choice-goal");
    }
  });

  const pvpPrepCommand = "UberPvPOptimizer";
  const pvpPrep = new CliStep("PvP Prep", pvpPrepCommand);

  const nightcap = new CliStep("Nightcap", "CONSUME NIGHTCAP");

  const visitOldMan = new FuncStep("Visit Old Man", () => {
    visitUrl("oldman.php", false);
    visitUrl("place.php?whichplace=sea_oldman&action=oldman_oldman");
  });

  const pullAll = new CliStep("Pull All", "pull all");

  const openRainDoh = new FuncStep("Open Rain-Doh", () => use(1, $item`can of Rain-Doh`));

  const melfDupe = new FuncStep("Melf Dupe", () => {
    takeCloset(1, melfDupeItem);
    equip($slot`off-hand`, $item`Drunkula's wineglass`);
    useFamiliar($familiar`Machine Elf`);
    visitUrl("adventure.php?snarfblat=458");
    visitUrl(`choice.php?whichchoice=1125&pwd&option=1&iid=${toInt(melfDupeItem)}`);
    putCloset(1, melfDupeItem);
    putShop(0, 0, 1, melfDupeItem);
  });

  const legRunner = new LegRunner([
    new Leg("Pre-Ascension", [
      breakfast,
      pirateBellow,
      // Once in a while diet code somewhere fails to apply ode because it doesn't think to shrug this.
      // Not entire sure why it's on in the first place, but let's shrug it to be safe.
      new CliStep("Shrug Ballad", "shrug power ballad of the arrowsmith"),
      setVoaSober,
      soberGarboAscend,
      ensureNoAdvs,
      setVoaDrunk,
      nightcap,
      blackheart,
      drunkGarboAscend,
      ensureNoAdvs,
      setVoaSober,
      pvpPrep,
      new CliStep("PvP", `pvp loot ${pvpStance}`),
      ensureNoFites,
      addToSession,
      new CliStep("Jump Gash to CS", "phccs_gash softcore"),
    ]),
    new Leg("Community Service", [
      new AssertStep(
        "Check Community Service",
        () => myPath() === "Community Service",
        "You should be on a Community Service run right now, but you aren't."
      ),
      new CliStep("PHCCS", "phccs"),
      visitOldMan,
      pullAll,
      openRainDoh,
      breakfast,
      pirateBellow,
      soberGarboAscend,
      ensureNoAdvs,
      setVoaDrunk,
      nightcap,
      blackheart,
      melfDupe,
      drunkGarboAscend,
      ensureNoAdvs,
      setVoaSober,
      addToSession,
      new FuncStep("Ascend Casual", () => {
        ascend(
          Paths.Unrestricted,
          $class`Seal Clubber`,
          Lifestyle.casual,
          "platypus",
          $item`astral six-pack`
        );
      }),
    ]),
    new Leg("Casual", [
      new AssertStep(
        "Check Casual",
        () => inCasual(),
        "You should be on a Casual run right now, but you aren't."
      ),
      new FuncStep("Smash Hippy Crap", () => {
        const smashText = visitUrl("peevpee.php?confirm=on&action=smashstone&pwd");
        if (smashText.indexOf("Pledge allegiance to") >= 0) {
          visitUrl("peevpee.php?action=pledge&place=fight&pwd");
        }
      }),
      openRainDoh,
      new FuncStep("Vist Guild Leader", () => visitUrl("guild.php?place=challenge")),
      new CliStep("Meat Golem", "use meat golem"),
      new CliStep("Clockwork Maid", "use clockwork maid"),
      new CliStep("Run Casual", "loopcasual"),
      new AssertStep(
        "Check Run Finished",
        () => get("kingLiberated"),
        "You should have freed the king, but you haven't."
      ),
      visitOldMan,
      breakfast,
      pirateBellow,
      new FuncStep("Florestize Barf Mountain", () => {
        adv1($location`Barf Mountain`);
        cliExecute("florist plant Stealing Magnolia");
        cliExecute("florist plant Aloe Guv'nor");
        cliExecute("florist plant Pitcher Plant");
      }),
      soberGarbo,
      ensureNoAdvs,
      nightcap,
      blackheart,
      melfDupe,
      new FuncStep("Burn Excess Fites", () => {
        cliExecute("soologout");
        const excessFites = pvpAttacksLeft() + 10 + numericModifier("PvP Fights") - 100;
        if (excessFites > 0) {
          cliExecute(pvpPrepCommand);
          cliExecute(`pvp ${excessFites} loot ${pvpStance}`);
        }
      }),
      new CliStep("Refresh Inventory", "refresh inv"),
      new FuncStep("Inventory Cleanup Prep", () => {
        const oneDayTickets = $items`one-day ticket to The Glaciest, one-day ticket to Dinseylandfill, one-day ticket to That 70s Volcano, Merc Core deployment orders, one-day ticket to Spring Break Beach`;
        oneDayTickets.forEach((ticket) => {
          const seller = Coinmaster.all().find((coinmaster) => sellsItem(coinmaster, ticket));
          if (seller && isAccessible(seller)) {
            const toBuy = Math.floor(itemAmount(seller.item) / sellPrice(seller, ticket));
            if (toBuy > 0) {
              print(
                `Buying ${toBuy} ${toBuy !== 1 ? ticket.plural : ticket} with our ${itemAmount(
                  seller.item
                )} ${seller.item.plural}`
              );
              buy(seller, toBuy, ticket);
            }
          }
        });

        const barrels = $items`little firkin, normal barrel, big tun, weathered barrel, dusty barrel, disintegrating barrel, moist barrel, rotting barrel, mouldering barrel, barnacled barrel`;
        let barrelCount = barrels
          .map((barrel) => itemAmount(barrel))
          .reduce((total, current) => total + current, 0);
        if (barrelCount > 1) {
          const firstBarrel = barrels.find((barrel) => itemAmount(barrel) > 0);
          if (firstBarrel) {
            visitUrl(`inv_use.php?pwd&whichitem=${toInt(firstBarrel)}&choice=1`);
            while (barrelCount > 1) {
              const smashedCount = Math.min(barrelCount, 100);
              print(`Smashing ${smashedCount} barrels!`, "blue");
              visitUrl("choice.php?pwd&whichchoice=1101&option=2");
              barrelCount -= smashedCount;
            }
          }
        }
        if (barrelCount === 1) {
          const remainingBarrel = barrels.find((barrel) => itemAmount(barrel) > 0);
          if (remainingBarrel) {
            print("Smashing 1 barrel!");
            use(1, remainingBarrel);
          }
        }
      }),
      new CliStep("Inventory Cleanup", "philter"),
      new CliStep("Prep For Rollover", "soologout"),
    ]),
  ]);

  legRunner.run();

  const sessionDiff = Session.current().diff(session);
  const results = sessionDiff.value(garboValue);

  const garboMeat = get("garboResultsMeat", 0);
  const garboItems = get("garboResultsItems", 0);
  const garboTotal = garboMeat + garboItems;

  print("Today's garbo earnings...", "blue");
  print(`>  Meat: ${garboMeat.toLocaleString("en-US")}`);
  print(`> Items: ${garboItems.toLocaleString("en-US")}`);
  print(`> Total: ${garboTotal.toLocaleString("en-US")}`);
  print("This run of sooloops...", "blue");
  print(`>  Meat: ${results.meat.toLocaleString("en-US")}`);
  print(`> Items: ${results.items.toLocaleString("en-US")}`);
  print(`> Total: ${results.total.toLocaleString("en-US")}`);
}