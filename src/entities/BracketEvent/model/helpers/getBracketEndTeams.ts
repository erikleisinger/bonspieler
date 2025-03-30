import type { BracketGameType } from "@/entities/Bracket";
export function getBracketEndTeams(bracket: BracketGameType[][][] = [[[]]]) {
  return bracket.reduce((all, rounds) => {
    return all + rounds[rounds.length - 1]?.length || 0;
  }, 0);
}
