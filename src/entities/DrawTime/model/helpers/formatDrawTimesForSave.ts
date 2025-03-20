import { BracketDrawTimes } from "@/entities/Bracket";
import type { Tables } from "@/shared/api";
export function formatDrawTimesForSave({
  tournamentId,
  stageId,
  drawTimes,
}: {
  tournamentId: string;
  stageId: string;
  drawTimes: BracketDrawTimes;
}): Partial<Tables<"draws">>[] {
  return Object.entries(drawTimes).reduce<Partial<Tables<"draws">>[]>(
    (all, [drawNumber, drawTime]) => {
      let parsedDrawNum: number | null = Number(drawNumber);

      if (Number.isNaN(parsedDrawNum)) {
        parsedDrawNum = null;
      } else {
        parsedDrawNum = parsedDrawNum;
      }
      return [
        ...all,
        {
          tournament_id: tournamentId,
          tournament_stage_id: stageId,
          draw_number: parsedDrawNum,
          time: drawTime || null,
        },
      ];
    },
    []
  );
}
