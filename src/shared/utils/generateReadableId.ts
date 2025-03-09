import type { BracketGame } from "@/entities/Bracket";
import { numberToLetter } from "@/shared/utils/numberToLetter";
export function generateReadableId(game: BracketGame, index: number) {
  return `${numberToLetter(game.bracketNumber + 1)}${index + 1}`;
}
