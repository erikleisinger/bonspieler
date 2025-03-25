import type { BracketGameType } from "@/entities/Bracket";
import { getBracketEndTeams } from "./getBracketEndTeams";

export function getBracketEventEndTeams(brackets: BracketGameType[][][]) {
  return brackets.reduce(
    (all, current) => all + getBracketEndTeams(current),
    0
  );
}
