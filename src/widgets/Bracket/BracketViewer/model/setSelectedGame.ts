import type { AppThunk } from "@/lib/store";
import { BracketGameType } from "@/entities/Bracket";
import { getBracketGames } from "@/entities/Bracket/BracketGame";
import { _setSelectedGame } from "./bracketViewerSlice";

export const setSelectedGame =
  (gameOrGameId: BracketGameType | string): AppThunk =>
  (dispatch, getState) => {
    if (typeof gameOrGameId === "string") {
      const state = getState();
      const brackets = [...getBracketGames(state)];
      const game = brackets
        .flat()
        .flat()
        .find((game) => game.id === gameOrGameId);
      if (!game) {
        console.warn("could not select game: game could not be found");
        return;
      }
      dispatch(_setSelectedGame(game));
    } else if (gameOrGameId?.id) {
      dispatch(_setSelectedGame(gameOrGameId));
    } else if (!gameOrGameId) {
      dispatch(_setSelectedGame(null));
    }
  };
