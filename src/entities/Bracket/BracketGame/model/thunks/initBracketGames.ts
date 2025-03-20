import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBracketGames } from "../api";
import type {
  BracketGameType,
  BracketReadableIdIndex,
  BracketSchedule,
} from "@/entities/Bracket";
import { formatGameForDisplay } from "../helpers";
export const initBracketGames = createAsyncThunk(
  "tournament/initBracketGames",
  async (
    bracketStageId: string
  ): Promise<{
    gameIndex: {
      [gameId: string]: BracketGameType;
    };
    brackets: BracketGameType[][][];
    readableIdIndex: BracketReadableIdIndex;
    schedule: BracketSchedule;
  }> => {
    const games = (await fetchBracketGames(bracketStageId)) || [];

    const brackets: BracketGameType[][][] = [];
    games?.forEach((game) => {
      const { group_number = 0, round_number = 0 } = game;

      if (!brackets[group_number]) {
        brackets[group_number] = [];
      }

      if (!brackets[group_number][round_number]) {
        brackets[group_number][round_number] = [];
      }

      brackets[group_number][round_number].push(formatGameForDisplay(game));
    });

    const { gameIndex, readableIdIndex, schedule } = games.reduce<{
      gameIndex: {
        [gameId: string]: BracketGameType;
      };
      readableIdIndex: BracketReadableIdIndex;
      schedule: BracketSchedule;
    }>(
      (acc, game) => {
        return {
          ...acc,
          gameIndex: {
            ...acc.gameIndex,
            [game.id]: formatGameForDisplay(game),
          },
          readableIdIndex: {
            ...acc.readableIdIndex,
            [game.id]: game.readable_id || null,
          },
          schedule: {
            ...acc.schedule,
            [game.id]: game.draw_number || null,
          },
        };
      },
      {
        gameIndex: {},
        readableIdIndex: {},
        schedule: {},
      }
    );

    return { gameIndex, brackets, readableIdIndex, schedule };
  }
);
