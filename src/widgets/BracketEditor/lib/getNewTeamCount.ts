import type { BracketConnections } from "@/entities/Bracket";
import { MAX_TEAM_COUNT } from "./constants";
export function getNewTeamCount(
  newTeamCount: string,
  currentTeamCount: number
): number {
  const newValue = parseInt(newTeamCount);

  if (newValue < 1) return currentTeamCount;
  if (newValue > MAX_TEAM_COUNT) return currentTeamCount;
  return newValue;
}
