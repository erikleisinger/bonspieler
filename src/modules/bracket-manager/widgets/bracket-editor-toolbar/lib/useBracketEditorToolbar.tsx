import { useState, useEffect } from "react";
import { BracketEditorToolbarState } from "../types";
import { useBracketSelector } from "@/modules/bracket-manager/shared/hooks";
import { useBracketDispatch } from "@/modules/bracket-manager/shared/hooks";
import {
  getSelectedGame,
  setSelectedGame,
} from "@/modules/bracket-manager/shared/store";

export default function useBracketEditorToolbar(
  {
    allow = [
      BracketEditorToolbarState.ViewingGame,
      BracketEditorToolbarState.ViewingInterBracketConnection,
    ],
  }: {
    allow?: BracketEditorToolbarState[] | "all";
  } = {
    allow: [
      BracketEditorToolbarState.ViewingGame,
      BracketEditorToolbarState.ViewingInterBracketConnection,
    ],
  }
) {
  const dispatch = useBracketDispatch();

  const selectedGame = useBracketSelector(getSelectedGame);

  const allowedStates =
    allow === "all" ? Object.values(BracketEditorToolbarState) : allow;

  const viewingNextRoundGameConnection = false;

  const [toolbarState, setToolbarState] =
    useState<BracketEditorToolbarState | null>(null);

  function maybeDeselectGame(newState: BracketEditorToolbarState) {
    if (
      newState !== BracketEditorToolbarState.ViewingGame &&
      selectedGame?.id
    ) {
      dispatch(setSelectedGame, null);
    }
  }

  function updateToolbarState(newState: BracketEditorToolbarState | null) {
    if (newState === null) {
      setToolbarState(null);
      return;
    }

    if (!allowedStates.includes(newState)) {
      console.warn(`${newState} is not allowed`);
      return;
    }

    if (toolbarState === newState) {
      setToolbarState(null);
    } else if (toolbarState === null) {
      setToolbarState(newState);
    } else {
      setToolbarState(null);
      setTimeout(() => {
        setToolbarState(newState);
      }, 50);
    }

    maybeDeselectGame(newState);
  }

  useEffect(() => {
    if (selectedGame?.id) {
      if (toolbarState === BracketEditorToolbarState.ViewingGame) {
        return;
      } else {
        updateToolbarState(BracketEditorToolbarState.ViewingGame);
      }
    } else {
      updateToolbarState(null);
    }
  }, [selectedGame]);

  // useEffect(() => {
  //   if (viewingNextRoundGameConnection?.id) {
  //     if (
  //       toolbarState === BracketEditorToolbarState.ViewingInterBracketConnection
  //     ) {
  //       return;
  //     } else {
  //       updateToolbarState(
  //         BracketEditorToolbarState.ViewingInterBracketConnection
  //       );
  //     }
  //   } else {
  //     updateToolbarState(null);
  //   }
  // }, [viewingNextRoundGameConnection?.id]);

  return { toolbarState, setToolbarState: updateToolbarState };
}
