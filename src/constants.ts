import { $item, get } from "libram";

// day prop exists as a security measure to prevent having
// to be careful about _ props being reset upon ascension.
// Could handle that successfully, but why bother?
export const dayProp = "sooloopsLastDay";
export const legProp = "sooloopsLegsDone";
export const stepProp = "_sooloopsStepsDone";
export const meatProp = "sooloopsMeatValue";
export const itemProp = "sooloopsItemValue";

export const pvpStance = "letter";
export const pvpPrepCommand = "UberPvPOptimizer";

export const voaSober = get("valueOfAdventure");
export const voaDrunk = Math.round(get("valueOfAdventure") * 0.6);

export const melfDupeItem = $item`alien protein powder`;
