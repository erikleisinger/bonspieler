import type { BracketGameType } from "@/entities/Bracket";
export function getBracketEndTeams(bracket: BracketGameType[][] = [[]]) {
  return bracket[bracket.length - 1]?.length || 0;
}
