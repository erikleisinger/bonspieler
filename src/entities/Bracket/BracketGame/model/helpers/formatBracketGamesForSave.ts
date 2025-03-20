import type {
  BracketDrawTimes,
  BracketGameType,
  BracketReadableIdIndex,
  BracketSchedule,
} from "@/entities/Bracket";
import { formatGameForSave } from "./formatGameForSave";
import type { Tables } from "@/shared/api";

export function formatBracketGamesForSave({
  tournamentId,
  bracketStageId,
  brackets,
  readableIdIndex,

  schedule,
}: {
  tournamentId: string;
  bracketStageId: string;
  brackets: BracketGameType[][][];
  readableIdIndex: BracketReadableIdIndex;

  schedule: BracketSchedule;
}): Partial<Tables<"games">>[] {
  const games: Partial<Tables<"games">>[] = [];

  brackets
    .flat()
    .flat()
    .forEach((game) => {
      games.push({
        ...formatGameForSave({
          tournamentId,
          bracketStageId,
          game,
        }),
        readable_id: readableIdIndex[game.id],
        draw_number: schedule[game.id],
      });
    });
  return games;
}
