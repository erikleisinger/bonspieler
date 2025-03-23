import { BracketGameType } from "@/entities/Bracket";

export function generateGameIndex(games: BracketGameType[][][]) {
  if (!games?.length) return {};
  return games
    .flat()
    .flat()
    .reduce((all, current) => {
      return {
        ...all,
        [current.id]: current,
      };
    }, {});
}
