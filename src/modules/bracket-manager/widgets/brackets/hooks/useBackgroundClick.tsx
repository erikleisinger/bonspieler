import { useEffect } from "react";
import { useBracketDispatch } from "@/modules/bracket-manager/shared/hooks";
import { setSelectedGame } from "@/modules/bracket-manager/shared/store";
import {
  BRACKET_GAME,
  BRACKET_GAME_FINAL_RESULT,
} from "../lib/constants/element-id";

export function useBackgroundClick({
  callback,
  ref,
}: {
  callback?: () => void;
  ref: React.RefObject<HTMLElement | null>;
}) {
  const dispatch = useBracketDispatch();

  useEffect(() => {
    // Only proceed if we have a valid DOM element
    if (!ref.current) return;

    const element = ref.current;

    function onClick(e: MouseEvent) {
      // Get the path of elements from the event target up to the window
      const elementsInPath = e.composedPath() as HTMLElement[];

      // Check if any element in the path has either of our target classes
      const shouldIgnoreClick = elementsInPath.some((element) => {
        if (!element.classList) return false;
        return (
          element.classList.contains(BRACKET_GAME) ||
          element.classList.contains(BRACKET_GAME_FINAL_RESULT)
        );
      });

      if (shouldIgnoreClick) return;

      dispatch(setSelectedGame, { game: null });
      if (callback) callback();
    }

    element.addEventListener("click", onClick);

    return () => {
      element.removeEventListener("click", onClick);
    };
  }, [callback, dispatch, ref]);
}
