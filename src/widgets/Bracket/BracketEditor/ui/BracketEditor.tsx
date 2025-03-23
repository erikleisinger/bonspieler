// Types & enums

import type { BracketGameType } from "@/entities/Bracket";

/* Store */

import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getLookingToAssignTeam,
  assignTeamToGame,
} from "@/entities/BracketEvent";
import { setSelectedGame } from "@/widgets/Bracket/BracketViewer";

/** Context */

import GameAvailabilityContextProvider from "./GameAvailabilityContextProvider";

/**Components */

import { BracketViewer } from "@/widgets/Bracket/BracketViewer";

/* Utils */

import { scrollToGame } from "@/entities/Bracket";

export default function BracketEditor() {
  const dispatch = useAppDispatch();

  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);

  function onGameClick(game: BracketGameType) {
    if (lookingToAssignTeam) {
      dispatch(
        assignTeamToGame({
          teamId: lookingToAssignTeam,
          gameId: game.id,
        })
      );
    } else {
      dispatch(setSelectedGame(game.id));
      scrollToGame(game.id);
    }
  }

  return (
    <GameAvailabilityContextProvider>
      <BracketViewer onGameClick={onGameClick}></BracketViewer>
    </GameAvailabilityContextProvider>
  );
}
