import { useState, useEffect } from "react";
import type { Nullable } from "@/shared/types";
import { BracketEditorToolbarState } from "@/widgets/Bracket/BracketEditorToolbar";
import { useAppSelector, useAppDispatch } from "@/lib/store";

import {
  getSelectedGame,
  setSelectedGame,
} from "@/widgets/Bracket/BracketViewer";
export default function useBracketEditorToolbarState({
  toolbarRefs,
}: {
  toolbarRefs: React.RefObject<Nullable<HTMLDivElement>>[];
}) {
  const dispatch = useAppDispatch();
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

  function checkClickInsideRef(event: MouseEvent) {
    if (!toolbarRefs?.length) return true;
    return toolbarRefs.some((ref) => {
      if (!ref?.current) return false;
      return ref.current && ref.current.contains(event.target);
    });
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!checkClickInsideRef(event)) {
        updateToolbarState(null);
        dispatch(setSelectedGame(null));
      }
    }
    if (toolbarRefs?.length && !!toolbarState) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toolbarRefs, toolbarState]);

  return { toolbarState, setToolbarState: updateToolbarState };
}
