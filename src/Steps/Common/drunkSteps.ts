import {
  abort,
  adv1,
  availableAmount,
  equip,
  itemAmount,
  putCloset,
  putShop,
  takeCloset,
  toInt,
  toItem,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { $familiar, $item, $location, $slot, get } from "libram";
import { isHalloween, melfDupeItem, voaDrunk, voaSober } from "../../constants";
import { propertyManager } from "../../props";
import { CliStep, tryCliExecute } from "../CliStep";
import { FuncStep } from "../FuncStep";

export const nightcapAscend = new CliStep(
  "Nightcap To Run Drunk Turns",
  `CONSUME NIGHTCAP VALUE ${voaDrunk}${isHalloween ? " NOMEAT" : ""}`
);

export const nightcap = new CliStep("Nightcap", `CONSUME NIGHTCAP NOMEAT VALUE ${voaSober}`);

export const blackheart = new FuncStep("Blackheart", () => {
  if (!get("_interviewMasquerade") && availableAmount($item`plastic vampire fangs`) > 0) {
    equip($slot`off-hand`, $item`Drunkula's wineglass`);
    equip($slot`acc3`, $item`plastic vampire fangs`);
    visitUrl("place.php?whichplace=town&action=town_vampout");
    tryCliExecute("choice-goal");
  }
});

export const melfDupe = new FuncStep("Melf Dupe", () => {
  takeCloset(1, melfDupeItem);
  equip($slot`off-hand`, $item`Drunkula's wineglass`);
  useFamiliar($familiar`Machine Elf`);
  visitUrl("adventure.php?snarfblat=458");
  visitUrl("choice.php?whichchoice=1119&pwd&option=4");
  visitUrl(`choice.php?whichchoice=1125&pwd&option=1&iid=${toInt(melfDupeItem)}`);
  putCloset(1, melfDupeItem);
  putShop(0, 0, 1, melfDupeItem);
});

export const grabFusedFuse = new FuncStep("Grab Fused Fuse if Needed", () => {
  if (get("_volcanoItem1") === 0) {
    visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
  }
  const fuseOption = [1, 2, 3]
    .map((num) => toItem(get(`_volcanoItem${num}`, 0)))
    .indexOf($item`fused fuse`);
  if (fuseOption !== -1) {
    abort("testing testing");
  }
  if (fuseOption >= 0 && !get("_volcanoItemRedeemed")) {
    if (itemAmount($item`fused fuse`) < 1 && !get("_claraBellUsed")) {
      equip($slot`off-hand`, $item`Drunkula's wineglass`);
      use(1, $item`Clara's bell`);
      propertyManager.setChoices({ 1091: 7 });
      adv1($location`LavaCo™ Lamp Factory`);
    }
    if (itemAmount($item`fused fuse`) > 0) {
      visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
      visitUrl(`choice.php?whichchoise=1093&pwd&option=${fuseOption + 1}`);
    }
  }
});
