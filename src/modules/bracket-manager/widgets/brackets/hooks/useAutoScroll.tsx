import { useEffect } from "react";
import { scrollToGame } from "../lib/scroll";

import { useBracketSelector } from "@/modules/bracket-manager/shared/hooks";
import {
  getSelectedGame,
  getAvailableGameIds,
} from "@/modules/bracket-manager/shared/store/selectors";
export function useAutoScroll({
  scrollerRef,
}: {
  scrollerRef: React.RefObject<HTMLElement | null>;
}) {
  const selectedGame = useBracketSelector(getSelectedGame);
  const availableGameIds = useBracketSelector(getAvailableGameIds);
  useEffect(() => {
    if (!scrollerRef.current) return;
    if (availableGameIds?.length) {
      const [firstAvailableGameId] = availableGameIds;
      scrollToGame(firstAvailableGameId, scrollerRef);
    } else if (selectedGame?.id) {
      scrollToGame(selectedGame.id, scrollerRef);
    }
  }, [selectedGame, scrollerRef, availableGameIds]);

  // const bracketIds = useMemo(() => {
  //   return brackets.map((rounds) => rounds.flat()[0].id);
  // }, [brackets]);

  // const [oldBracketIds, setOldBracketIds] = useState<string[]>([]);

  // useEffect(() => {
  //   const firstNewBracketIndex = bracketIds.findIndex(
  //     (id) => !oldBracketIds.includes(id)
  //   );

  //   if (firstNewBracketIndex !== -1) {
  //     scrollToBracket(firstNewBracketIndex, scrollerRef);
  //   }
  //   setOldBracketIds(bracketIds);
  // }, [bracketIds]);
}
