import { useBracketDispatch } from "@/modules/bracket-manager/shared/hooks/useBracketDispatch";
import { setSelectedGame } from "@/modules/bracket-manager/shared/store";
import type { Nullable } from "@/shared/types";
import { BracketGame } from "@/modules/bracket-manager/shared/types";
export function useBracketInteractions(
  {
    extendOnGameClick,
  }: {
    extendOnGameClick?: Nullable<(game: Nullable<BracketGame>) => boolean>;
  } = {
    extendOnGameClick: null,
  }
) {
  const dispatch = useBracketDispatch();

  function onGameClick(game: Nullable<BracketGame>) {
    if (extendOnGameClick) {
      const shouldContinue = extendOnGameClick(game);
      console.log("shouldContinue", shouldContinue);
      if (!shouldContinue) return;
      dispatch(setSelectedGame, { game });
    } else {
      dispatch(setSelectedGame, { game });
    }
  }

  return {
    onGameClick,
  };
}
