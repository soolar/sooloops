import {
  buy,
  Coinmaster,
  isAccessible,
  itemAmount,
  print,
  sellPrice,
  sellsItem,
  toInt,
  use,
  visitUrl,
} from "kolmafia";
import { $items } from "libram";
import { CliStep } from "../CliStep";
import { FuncStep } from "../FuncStep";

export const refreshInv = new CliStep("Refresh Inventory", "refresh inv");

export const buyOneDayTickets = new FuncStep("Buy One-Day Tickets", () => {
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
});

export const smashBarrels = new FuncStep("Smash Barrels", () => {
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
});

export const wadify = new FuncStep("Wad Up", () => {
  // Finish unlocking guild
  visitUrl("guild.php?place=challenge");
  visitUrl("guild.php?place=malus");
  const powdersAndNuggies = $items`twinkly powder, hot powder, cold powder, spooky powder, stench powder, sleaze powder, twinkly nuggets, hot nuggets, cold nuggets, spooky nuggets, stench nuggets, sleaze nuggets`;
  powdersAndNuggies
    .filter((it) => itemAmount(it) >= 5)
    .forEach((it) =>
      visitUrl(`guild.php?action=malussmash&pwd&whichitem=${toInt(it)}&quantity=1&smashall=1`)
    );
});

export const cleanupInventory = new CliStep("Inventory Cleanup", "ocd-cleanup");
