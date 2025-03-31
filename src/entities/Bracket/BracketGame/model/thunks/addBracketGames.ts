import type { AppThunk } from "@/lib/store";
import { BracketGameType } from "@/entities/Bracket";
import { updateBracketGames } from "../bracketGamesSlice";
export const addBracketGames =
  ({
    games,
    index,
  }: {
    games: BracketGameType[][][];
    index: number;
  }): AppThunk =>
  (dispatch) => {
    dispatch(
      updateBracketGames({
        brackets: games[0],
        index,
      })
    );
  };
