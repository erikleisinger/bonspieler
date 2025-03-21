import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBracketEventConnections } from "../api";
import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
} from "../../types/Connections";
import { Tables } from "@/shared/api";

interface ViewableConnections {
  winnerConnections: WinnerConnections;
  loserConnections: LoserConnections;
  originConnections: OriginConnections;
}

interface ReturnType extends ViewableConnections {
  connections: Tables<"game_connections">[];
}

export const initBracketConnections = createAsyncThunk(
  "tournament/initBracketConnections",
  async (bracketEventId: string): Promise<ReturnType> => {
    const connections = await fetchBracketEventConnections(bracketEventId);
    if (!connections) {
      return {
        winnerConnections: {},
        loserConnections: {},
        originConnections: {},
        connections: [],
      };
    }
    const viewableConnections = connections?.reduce<ViewableConnections>(
      (all, current) => {
        const { winner, origin_game_id, destination_game_id } = current;
        const allClone = { ...all };
        if (!origin_game_id || !destination_game_id) return allClone;

        if (!allClone.originConnections[destination_game_id]) {
          allClone.originConnections[destination_game_id] = [];
        }
        if (!allClone.loserConnections[origin_game_id]) {
          allClone.loserConnections[origin_game_id] = null;
        }
        if (!allClone.winnerConnections[origin_game_id]) {
          allClone.winnerConnections[origin_game_id] = null;
        }

        if (winner) {
          allClone.winnerConnections[origin_game_id] = destination_game_id;
          allClone.originConnections[destination_game_id].push({
            isWinner: true,
            gameId: origin_game_id,
          });
        } else {
          allClone.loserConnections[origin_game_id] = destination_game_id;
          allClone.originConnections[destination_game_id].push({
            isWinner: false,
            gameId: origin_game_id,
          });
        }
        return allClone;
      },
      {
        loserConnections: {},
        winnerConnections: {},
        originConnections: {},
      }
    );

    return {
      ...viewableConnections,
      connections,
    };
  }
);
