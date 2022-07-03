import { adv1, use, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { CliStep, tryCliExecute } from "../CliStep";
import { FuncStep } from "../FuncStep";

// This is necessary to get the sea jelly from the space jellyfish during breakfast
export const visitOldMan = new FuncStep("Visit Old Man", () => {
  visitUrl("oldman.php", false);
  visitUrl("place.php?whichplace=sea_oldman&action=oldman_oldman");
});

export const openRainDoh = new FuncStep("Open Rain-Doh", () => use(1, $item`can of Rain-Doh`));

export const florestizeBarfMountain = new FuncStep("Florestize Barf Mountain", () => {
  adv1($location`Barf Mountain`);
  tryCliExecute("florist plant Stealing Magnolia");
  tryCliExecute("florist plant Aloe Guv'nor");
  tryCliExecute("florist plant Pitcher Plant");
});

// Once in a while diet code somewhere fails to apply ode because it doesn't think to shrug this.
// Not entire sure why it's on in the first place, but let's shrug it to be safe.
export const shrugBallad = new CliStep("Shrug Ballad", "shrug power ballad of the arrowsmith");

export const pullAll = new CliStep("Pull All", "pull all");

export const visitGuildLeader = new FuncStep("Vist Guild Leader", () =>
  visitUrl("guild.php?place=challenge")
);

export const meatGolem = new CliStep("Meat Golem", "use meat golem");
export const clockworkMaid = new CliStep("Clockwork Maid", "use clockwork maid");
