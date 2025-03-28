import { useState, useEffect } from "react";
import type { Nullable } from "@/shared/types";
import { BracketEditorToolbarState } from "@/widgets/Bracket/BracketEditorToolbar";
import { useAppSelector, useAppDispatch } from "@/lib/store";

import {
  getSelectedGame,
  setSelectedGame,
} from "@/widgets/Bracket/BracketViewer";
export default function useBracketEditorToolbarState() {
  const selectedGame = useAppSelector(getSelectedGame);

  const [toolbarState, setToolbarState] =
    useState<BracketEditorToolbarState | null>(null);

  function updateToolbarState(newState: BracketEditorToolbarState | null) {
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

  return { toolbarState, setToolbarState: updateToolbarState };
}
