import { BracketGameType } from "@/entities/Bracket";
import { getBracketStartTeams } from "./getBracketStartTeams";

export function getBracketEventStartTeams(brackets: BracketGameType[][][]) {
  return brackets.reduce(
    (all, current) => all + getBracketStartTeams(current),
    0
  );
}
