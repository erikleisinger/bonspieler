import type { BracketGame } from "@/entities/Bracket";
import { generateReadableId } from "@/shared/utils/generateReadableId";
export function generateReadableIdIndex(brackets: BracketGame[][][]) {
  const index: { [gameId: string]: string } = {};
  brackets.forEach((bracket) => {
    bracket.flat().forEach((game, gameIndex) => {
      index[game.id] = generateReadableId(game, gameIndex);
    });
  });

  return index;
}
