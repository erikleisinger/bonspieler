import type { AppThunk } from "@/lib/store";
import { BracketGameType } from "@/entities/Bracket";
import {
  updateBracketGameIndex,
  updateBracketGames,
} from "../bracketGamesSlice";
import { generateGameIndex } from "../helpers";
export const addBracketGames =
  ({
    games,
    index,
  }: {
    games: BracketGameType[][][];
    index: number;
  }): AppThunk =>
  (dispatch) => {
    const gameIndex = generateGameIndex(games);
    dispatch(
      updateBracketGames({
        brackets: games[0],
        index,
      })
    );
    dispatch(updateBracketGameIndex(gameIndex));
  };
