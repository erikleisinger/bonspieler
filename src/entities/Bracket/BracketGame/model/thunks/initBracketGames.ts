import type { AppThunk } from "@/lib/store";
import { BracketGameType } from "@/entities/Bracket";
import { setBracketGames } from "../bracketGamesSlice";

export const initBracketGames =
  (games: BracketGameType[][][]): AppThunk =>
  (dispatch) => {
    const gamesToAdd = (games || []).filter(Boolean);
    dispatch(setBracketGames(gamesToAdd));
  };
