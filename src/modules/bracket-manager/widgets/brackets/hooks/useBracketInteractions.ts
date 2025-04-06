import { useBracketDispatch } from "@/modules/bracket-manager/shared/hooks/useBracketDispatch";
import { setSelectedGame } from "@/modules/bracket-manager/shared/store";
import type { Nullable } from "@/shared/types";
import { BracketGame } from "@/modules/bracket-manager/shared/types";
import { useContext } from "react";
import { StageContext } from "@/modules/bracket-manager/shared/lib/context";
export function useBracketInteractions(
  {
    extendOnGameClick,
  }: {
    extendOnGameClick?: Nullable<
      (game: Nullable<BracketGame>, stageId: string) => boolean
    >;
  } = {
    extendOnGameClick: null,
  }
) {
  const { stageId } = useContext(StageContext);

  const dispatch = useBracketDispatch();

  function onGameClick(game: Nullable<BracketGame>) {
    if (extendOnGameClick) {
      const shouldContinue = extendOnGameClick(game, stageId);
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
