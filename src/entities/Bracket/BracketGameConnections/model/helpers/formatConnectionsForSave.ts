import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
} from "../../types";
import type { Tables } from "@/shared/api";

import { formatConnectionForSave } from "./formatConnectionForSave";

export function formatConnectionsForSave({
  connections,
  bracketStageId,
  tournamentId,
}: {
  connections: {
    loserConnections: LoserConnections;
    winnerConnections: WinnerConnections;
    originConnections: OriginConnections;
  };
  bracketStageId: string;
  tournamentId: string;
}): Partial<Tables<"game_connections">>[] {
  const { loserConnections, winnerConnections } = connections;
  const winners = Object.entries({ ...winnerConnections }).map(
    ([gameId, connectionId]) => {
      return formatConnectionForSave({
        gameId,
        connectionId,
        tournamentId,
        bracketStageId,
        isWinner: true,
      });
    }
  );
  const losers = Object.entries({ ...loserConnections }).map(
    ([gameId, connectionId]) => {
      return formatConnectionForSave({
        gameId,
        connectionId,
        tournamentId,
        bracketStageId,
        isWinner: false,
      });
    }
  );

  return [...winners, ...losers];
}
