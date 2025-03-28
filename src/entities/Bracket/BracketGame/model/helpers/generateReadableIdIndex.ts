import type { BracketGameType } from "@/entities/Bracket";
import { generateReadableId } from "./generateReadableId";
export function generateReadableIdIndex(brackets: BracketGameType[][][]) {
  if (!brackets?.length) return {};
  const index: { [gameId: string]: string } = {};
  brackets.forEach((bracket) => {
    bracket.flat().forEach((game, gameIndex) => {
      index[game.id] = generateReadableId(game, gameIndex);
    });
  });

  return index;
}
