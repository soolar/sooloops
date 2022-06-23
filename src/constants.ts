import { $item, get } from "libram";

export const pvpStance = "letter";

export const dayProp = "soolarLoopsLastDay";
export const legProp = "soolarLoopsLegsDone";
export const stepProp = "_soolarLoopsStepsDone";

export const voaSober = get("valueOfAdventure");
export const voaDrunk = Math.round(get("valueOfAdventure") * 0.6);

export const melfDupeItem = $item`very fancy whiskey`;
