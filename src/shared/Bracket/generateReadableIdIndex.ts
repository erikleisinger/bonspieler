import type { BracketGameType } from "@/entities/Bracket";
export function generateReadableIdIndex(brackets: BracketGameType[][][]) {
  return brackets
    .flat()
    .flat()
    .reduce((all, current) => {
      return {
        ...all,
        [current.id]: current.readableId,
      };
    }, {});
}
