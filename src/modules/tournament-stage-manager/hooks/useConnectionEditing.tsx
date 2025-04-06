import {
  useBracketInteractions,
  type BracketGame,
} from "@/modules/bracket-manager";
import { useAppSelector } from "@/lib/store";
import { useAppDispatch } from "@/lib/store";
import { useState } from "react";
import {
  isConnectionMode,
  toggleConnectionMode,
} from "@/modules/bracket-manager/shared/store";

export function useConnectionEditing() {
  const dispatch = useAppDispatch();

  const isEditing = useAppSelector(isConnectionMode);

  const {
    beginLookingForNextStageConnection,
    isLookingForNextStageConnectionAnywhere,
    cancelLookingForNextStageConnection,
    setWinnerConnectionForGame,
    addOriginConnectionForGame,
    removeWinnerConnectionForGame,
  } = useBracketInteractions();

  const lookingForNextStage = useAppSelector(
    isLookingForNextStageConnectionAnywhere
  );

  function lookForConnection({
    stageId,
    game,
  }: {
    stageId: string;
    game: BracketGame;
  }) {
    if (lookingForNextStage) return;
    beginLookingForNextStageConnection({ stageId, gameId: game.id });
  }

  function setConnection({
    game,
    stageId,
  }: {
    game: BracketGame;
    stageId: string;
  }) {
    if (!lookingForNextStage?.lookingForNextStageConnection) return;
    setWinnerConnectionForGame({
      originStageId: lookingForNextStage.id,
      originGameId: lookingForNextStage.lookingForNextStageConnection?.id,
      newWinnerConnection: {
        gameId: game.id,
        stageId,
      },
    });
    addOriginConnectionForGame({
      stageId,
      gameId: game?.id,
      newOriginConnection: {
        gameId: lookingForNextStage.lookingForNextStageConnection?.id,
        stageId: lookingForNextStage.id,
        isWinner: true,
      },
    });
  }

  function onGameClickWhenEditing(game: BracketGame) {
    if (!isEditing) return;
    const { stageId } = game;
    if (lookingForNextStage) {
      if (game.id === lookingForNextStage.id) return;
      setConnection({ game, stageId });
      cancelLookingForNextStageConnection(lookingForNextStage.id);
    } else {
      removeWinnerConnectionForGame({
        stageId,
        gameId: game.id,
      });
      lookForConnection({ game, stageId });
    }
  }

  const onGameClick = isEditing ? onGameClickWhenEditing : undefined;

  function toggleEditing(bool: boolean) {
    dispatch(toggleConnectionMode({ bool }));
    if (!bool && lookingForNextStage?.id)
      cancelLookingForNextStageConnection(lookingForNextStage.id);
  }

  return {
    isEditing,
    toggleEditing,
    onGameClick,
  };
}
