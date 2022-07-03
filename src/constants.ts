import { visitUrl } from "kolmafia";
import { $item, get } from "libram";

// day prop exists as a security measure to prevent having
// to be careful about _ props being reset upon ascension.
// Could handle that successfully, but why bother?
export const dayProp = "sooloopsLastDay";
export const legProp = "sooloopsLegsDone";
export const stepProp = "_sooloopsStepsDone";
export const meatProp = "sooloopsMeatValue";
export const itemProp = "sooloopsItemValue";

export const pvpStance = "ASCII";
export const pvpPrepCommand = "UberPvPOptimizer";

export const isHalloween = visitUrl("place.php?whichplace=town&action=town_trickortreat").includes(
  "Trick-or-Treating"
);

const voaHalloween = 21169;
export const voaGarbo = get("valueOfAdventure");
export const voaSober = isHalloween ? voaHalloween : voaGarbo;
export const voaDrunk = isHalloween ? voaHalloween : Math.round(voaSober * 0.6);

export const melfDupeItem = $item`very fancy whiskey`;
