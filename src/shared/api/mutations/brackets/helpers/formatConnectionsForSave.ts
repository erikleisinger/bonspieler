import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
} from "@/entities/Bracket/BracketGameConnections";
import type { Tables } from "@/shared/api";

import { formatConnectionForSave } from "./formatConnectionForSave";

export function formatConnectionsForSave({
  connections,
  tournamentId,
}: {
  connections: {
    loserConnections: LoserConnections;
    winnerConnections: WinnerConnections;
    originConnections: OriginConnections;
  };
  tournamentId: string;
}): Partial<Tables<"game_connections">>[] {
  const { loserConnections, winnerConnections } = connections;
  const winners = Object.entries({ ...winnerConnections }).map(
    ([gameId, connection]) => {
      const { gameId: connectionId } = connection || {};
      return formatConnectionForSave({
        gameId,
        connectionId,
        tournamentId,
        isWinner: true,
      });
    }
  );
  const losers = Object.entries({ ...loserConnections }).map(
    ([gameId, connection]) => {
      const { gameId: connectionId } = connection || {};
      return formatConnectionForSave({
        gameId,
        connectionId,
        tournamentId,
        isWinner: false,
      });
    }
  );

  return [...winners, ...losers];
}
