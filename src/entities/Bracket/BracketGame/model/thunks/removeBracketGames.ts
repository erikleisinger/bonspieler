import type { AppThunk } from "@/lib/store";
import { getBracketGames, setBracketGames } from "../bracketGamesSlice";
export const removeBracketGames =
  (bracketIndexToRemove: number): AppThunk =>
  (dispatch, getState) => {
    const bracketGames = getBracketGames(getState());
    const newBrackets = [...bracketGames];
    newBrackets.splice(bracketIndexToRemove, 1);

    dispatch(setBracketGames(newBrackets));
  };
