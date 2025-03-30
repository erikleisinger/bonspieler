import type { AppThunk } from "@/lib/store";
import { BracketGameType } from "@/entities/Bracket";
import { setBracketGameIndex, setBracketGames } from "../bracketGamesSlice";
import { generateGameIndex } from "../helpers";
export const initBracketGames =
  (games: BracketGameType[][][]): AppThunk =>
  (dispatch) => {
    const gamesToAdd = (games || []).filter(Boolean);
    const gameIndex = generateGameIndex(gamesToAdd);
    dispatch(setBracketGames(gamesToAdd));
    dispatch(setBracketGameIndex(gameIndex));
  };
