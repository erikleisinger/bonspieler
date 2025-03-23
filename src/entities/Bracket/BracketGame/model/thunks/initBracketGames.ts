import type { AppThunk } from "@/lib/store";
import { BracketGameType } from "@/entities/Bracket";
import {
  setBracketGameIndex,
  setBracketGamesReadableIdIndex,
  setBracketGames,
} from "../bracketGamesSlice";
import { generateReadableIdIndex, generateGameIndex } from "../helpers";
export const initBracketGames =
  (games: BracketGameType[][][]): AppThunk =>
  (dispatch) => {
    const gamesToAdd = (games || []).filter(Boolean);
    const readableIdIndex = generateReadableIdIndex(gamesToAdd);
    const gameIndex = generateGameIndex(gamesToAdd);
    dispatch(setBracketGames(gamesToAdd));
    dispatch(setBracketGameIndex(gameIndex));
    dispatch(setBracketGamesReadableIdIndex(readableIdIndex));
  };
