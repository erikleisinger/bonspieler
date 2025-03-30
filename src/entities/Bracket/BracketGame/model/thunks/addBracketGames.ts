import type { AppThunk } from "@/lib/store";
import { BracketGameType } from "@/entities/Bracket";
import {
  updateBracketGameIndex,
  updateBracketGames,
} from "../bracketGamesSlice";
import { generateGameIndex } from "../helpers";
export const addBracketGames =
  (games: BracketGameType[][][]): AppThunk =>
  (dispatch) => {
    const gameIndex = generateGameIndex(games);
    dispatch(updateBracketGames(games || []));
    dispatch(updateBracketGameIndex(gameIndex));
  };
