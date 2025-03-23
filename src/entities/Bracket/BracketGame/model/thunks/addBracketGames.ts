import type { AppThunk } from "@/lib/store";
import { BracketGameType } from "@/entities/Bracket";
import {
  updateBracketGameIndex,
  updateBracketGamesReadableIdIndex,
  updateBracketGames,
} from "../bracketGamesSlice";
import { generateReadableIdIndex, generateGameIndex } from "../helpers";
export const addBracketGames =
  (games: BracketGameType[][][]): AppThunk =>
  (dispatch) => {
    const readableIdIndex = generateReadableIdIndex(games);
    const gameIndex = generateGameIndex(games);
    dispatch(updateBracketGames(games || []));
    dispatch(updateBracketGameIndex(gameIndex));
    dispatch(updateBracketGamesReadableIdIndex(readableIdIndex));
  };
