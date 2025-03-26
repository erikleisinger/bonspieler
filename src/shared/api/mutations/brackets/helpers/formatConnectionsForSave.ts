import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
} from "@/entities/Bracket/BracketGameConnections";
import type { Tables } from "@/shared/api";

import { formatConnectionForSave } from "./formatConnectionForSave";

export function formatConnectionsForSave({
  connections,
  bracketStageId,
  tournamentId,
  initialConnectionGameIds,
}: {
  connections: {
    loserConnections: LoserConnections;
    winnerConnections: WinnerConnections;
    originConnections: OriginConnections;
  };
  bracketStageId: string;
  tournamentId: string;
  initialConnectionGameIds: string[];
}): {
  toUpdate: Partial<Tables<"game_connections">>[];
  toInsert: Partial<Tables<"game_connections">>[];
  toDelete: string[];
} {
  const { loserConnections, winnerConnections } = connections;
  const newGameIds: string[] = [];
  const winners = Object.entries({ ...winnerConnections }).map(
    ([gameId, connectionId]) => {
      if (!newGameIds.includes(gameId)) newGameIds.push(gameId);
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
      if (!newGameIds.includes(gameId)) newGameIds.push(gameId);
      return formatConnectionForSave({
        gameId,
        connectionId,
        tournamentId,
        bracketStageId,
        isWinner: false,
      });
    }
  );

  const { toInsert, toUpdate } = [...winners, ...losers].reduce(
    (acc, connection) => {
      if (!connection) return acc;
      const { origin_game_id } = connection;

      if (initialConnectionGameIds.includes(origin_game_id)) {
        return {
          ...acc,
          toUpdate: [...acc.toUpdate, connection],
        };
      } else {
        return {
          ...acc,
          toInsert: [...acc.toInsert, connection],
        };
      }
    },
    {
      toUpdate: [],
      toInsert: [],
    }
  );

  const toDelete = initialConnectionGameIds.filter(
    (gameId) => !newGameIds.includes(gameId)
  );

  console.log({ toUpdate, toInsert, toDelete });

  return {
    toUpdate,
    toInsert,
    toDelete,
  };
}
