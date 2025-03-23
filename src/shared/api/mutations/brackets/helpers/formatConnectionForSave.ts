import type {
  BracketConnection,
  BracketConnectionTeam,
} from "@/entities/Bracket";
import type { Tables } from "@/shared/api";
import { Nullable } from "@/shared/types";

interface IncomingConnection extends BracketConnection {
  gameId: string;
  teams: BracketConnectionTeam[];
}

export function formatConnectionForSave({
  gameId,
  connectionId,
  bracketStageId,
  tournamentId,
  isWinner,
}: {
  gameId: string;
  connectionId: Nullable<string>;
  bracketStageId: string;
  tournamentId: string;
  isWinner: boolean;
}): Partial<Tables<"game_connections">> {
  const formatted = {
    winner: isWinner,
    origin_game_id: gameId,
    destination_game_id: connectionId,
    tournament_id: tournamentId,
    tournament_stage_id: bracketStageId,
  };
  return formatted;
}
