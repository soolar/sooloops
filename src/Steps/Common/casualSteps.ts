import { isHalloween } from "../../constants";
import { CliStep } from "../CliStep";
import { checkRunFinished } from "./safetyCheckSteps";

export const runCasual = isHalloween
  ? new CliStep("Casually Level", "loopcasual goal=level")
  : new CliStep("Run Casual", "loopcasual");

export const checkCasualFinished = isHalloween
  ? new CliStep("Casual Level Insurance", "loopcasual goal=level")
  : checkRunFinished;
