import { useState, useEffect } from "react";
import { BracketEditorToolbarState } from "@/widgets/Bracket/BracketEditorToolbar";
import { useAppSelector } from "@/lib/store";

import {
  getSelectedGame,
  getViewingNextRoundGameConnection,
} from "@/widgets/Bracket/BracketViewer";
export default function useBracketEditorToolbarState(
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
  const allowedStates =
    allow === "all" ? Object.values(BracketEditorToolbarState) : allow;

  const selectedGame = useAppSelector(getSelectedGame);
  const viewingNextRoundGameConnection = useAppSelector(
    getViewingNextRoundGameConnection
  );

  const [toolbarState, setToolbarState] =
    useState<BracketEditorToolbarState | null>(null);

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
  }, [selectedGame?.id]);

  useEffect(() => {
    console.log(
      "viewingNextRoundGameConnection",
      viewingNextRoundGameConnection
    );
    if (viewingNextRoundGameConnection?.id) {
      if (
        toolbarState === BracketEditorToolbarState.ViewingInterBracketConnection
      ) {
        return;
      } else {
        updateToolbarState(
          BracketEditorToolbarState.ViewingInterBracketConnection
        );
      }
    } else {
      updateToolbarState(null);
    }
  }, [viewingNextRoundGameConnection?.id]);

  return { toolbarState, setToolbarState: updateToolbarState };
}
