import type { Tables } from "@/shared/api";
import { Nullable } from "@/shared/types";

export function formatConnectionForSave({
  gameId,
  connectionId,
  tournamentId,
  isWinner,
}: {
  gameId: string;
  connectionId: Nullable<string>;
  tournamentId: string;
  isWinner: boolean;
}): Partial<Tables<"game_connections">> {
  const formatted = {
    winner: isWinner,
    origin_game_id: gameId,
    destination_game_id: connectionId,
    tournament_id: tournamentId,
  };
  return formatted;
}
