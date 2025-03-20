import type { BracketGameType } from "@/entities/Bracket";
import type { Tables } from "@/shared/api";

export function formatGameForSave({
  tournamentId,
  bracketStageId,
  game,
}: {
  tournamentId: string;
  bracketStageId: string;
  game: BracketGameType;
}): Partial<Tables<"games">> {
  const { id, bracketNumber, roundNumber, isSeed } = game;
  return {
    id,
    tournament_id: tournamentId,
    tournament_stage_id: bracketStageId,
    group_number: bracketNumber,
    round_number: roundNumber,
    is_seed: isSeed,
  };
}
