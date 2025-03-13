import { MAX_TEAM_COUNT } from "@/entities/Bracket";
export function getNewTeamCount(
  newTeamCount: string,
  currentTeamCount: number
): number {
  const newValue = parseInt(newTeamCount);
  if (isNaN(newValue)) return 1;
  if (newValue < 1) return currentTeamCount;
  if (newValue > MAX_TEAM_COUNT) return currentTeamCount;
  return newValue;
}
