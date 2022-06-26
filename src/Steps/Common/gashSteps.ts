import { $class, $item, ascend, Lifestyle, Paths } from "libram";
import { CliStep } from "../CliStep";
import { FuncStep } from "../FuncStep";

export const ascendCS = new CliStep("Jump Gash to CS", "phccs_gash softcore");

export const ascendCasual = new FuncStep("Ascend Casual", () => {
  ascend(
    Paths.Unrestricted,
    $class`Seal Clubber`,
    Lifestyle.casual,
    "platypus",
    $item`astral six-pack`
  );
});
