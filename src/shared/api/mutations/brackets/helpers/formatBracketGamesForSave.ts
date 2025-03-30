import type { BracketGameType, BracketSchedule } from "@/entities/Bracket";
import { formatGameForSave } from "./formatGameForSave";
import type { Tables } from "@/shared/api";

export function formatBracketGamesForSave({
  tournamentId,
  bracketStageId,
  brackets,
  schedule,
}: {
  tournamentId: string;
  bracketStageId: string;
  brackets: BracketGameType[][][];

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
        readable_id: game.readableId,
        draw_number: schedule[game.id],
      });
    });
  return games;
}
