import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBracketEventConnections } from "../api";
import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
} from "../../types/Connections";

interface ReturnType {
  winnerConnections: WinnerConnections;
  loserConnections: LoserConnections;
  originConnections: OriginConnections;
}

export const initBracketConnections = createAsyncThunk(
  "tournament/initBracketConnections",
  async (bracketEventId: string): ReturnType => {
    const connections = await fetchBracketEventConnections(bracketEventId);
    if (!connections) {
      return {
        winnerConnections: {},
        loserConnections: {},
        originConnections: {},
      };
    }
    return connections?.reduce<ReturnType>(
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
  }
);
