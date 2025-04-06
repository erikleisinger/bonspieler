import { BracketViewer } from "./views/bracket-viewer";
import BracketLoader from "./shared/ui/BracketLoader";
import {
  Brackets,
  Bracket,
  BracketRound,
  BracketGame,
  BracketGameMini,
} from "./widgets/brackets";
import { StageContext } from "@/modules/bracket-manager/shared/lib/context";
import React from "react";
import { useAppDispatch } from "@/lib/store";
import {
  beginLookingForNextStageConnection as beginLookingForNextStageConnectionAction,
  cancelLookingForNextStageConnection as cancelLookingForNextStageConnectionAction,
  setWinnerConnectionForGame as setWinnerConnectionForGameAction,
  addOriginConnectionForGame as addOriginConnectionForGameAction,
  isLookingForNextStageConnection,
  isLookingForNextStageConnectionAnywhere,
  getAllConnections,
  removeWinnerConnectionForGame as removeWinnerConnectionForGameAction,
  toggleConnectionMode as toggleConnectionModeAction,
} from "./shared/store";
import { DestinationConnection, OriginConnection } from "./shared/types";

/**
 *
 * Exposed store actions that can be used to modify the bracket.
 *
 */

export function useBracketInteractions() {
  const dispatch = useAppDispatch();

  function beginLookingForNextStageConnection({
    stageId,
    gameId,
  }: {
    stageId: string;
    gameId: string;
  }) {
    dispatch(beginLookingForNextStageConnectionAction({ stageId, gameId }));
  }

  function cancelLookingForNextStageConnection(stageId: string) {
    dispatch(cancelLookingForNextStageConnectionAction({ stageId }));
  }

  function setWinnerConnectionForGame({
    originStageId,
    originGameId,
    newWinnerConnection,
  }: {
    originStageId: string;
    originGameId: string;
    newWinnerConnection: DestinationConnection;
  }) {
    dispatch(
      setWinnerConnectionForGameAction({
        originStageId,
        originGameId,
        newWinnerConnection,
      })
    );
  }

  function addOriginConnectionForGame({
    stageId,
    gameId,
    newOriginConnection,
  }: {
    stageId: string;
    gameId: string;
    newOriginConnection: OriginConnection;
  }) {
    dispatch(
      addOriginConnectionForGameAction({
        stageId,
        gameId,
        newOriginConnection,
      })
    );
  }

  function toggleConnectionMode(bool: boolean) {
    dispatch(toggleConnectionModeAction({ bool }));
  }

  function removeWinnerConnectionForGame({
    stageId,
    gameId,
  }: {
    stageId: string;
    gameId: string;
  }) {
    dispatch(
      removeWinnerConnectionForGameAction({
        stageId,
        gameId,
      })
    );
  }

  return {
    beginLookingForNextStageConnection,
    cancelLookingForNextStageConnection,
    setWinnerConnectionForGame,
    addOriginConnectionForGame,
    isLookingForNextStageConnection,
    isLookingForNextStageConnectionAnywhere,
    getAllConnections,
    removeWinnerConnectionForGame,
    toggleConnectionMode,
  };
}

function BracketContext({
  stageId,
  children,
}: {
  children: React.ReactNode;
  stageId: string;
}) {
  return (
    <>
      <StageContext.Provider value={{ stageId }}>
        <BracketLoader stageId={stageId}>{children}</BracketLoader>
      </StageContext.Provider>
    </>
  );
}

export {
  BracketViewer,
  Brackets,
  BracketContext,
  BracketRound,
  Bracket,
  BracketGame,
  BracketGameMini,
};
export { getBracketGameElement } from "./widgets/brackets";
export type { BracketDisplaySize } from "./shared/types/BracketDisplaySize";
export type { BracketGame as BracketGameType } from "./shared/types/BracketGame";
