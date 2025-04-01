import { Nullable } from "@/shared/types";
import { getBracketGameElement } from "../getBracketGameElement";
import { scrollToElement } from "./scrollToElement";
export function scrollToGame(
  gameId: string,
  scrollerRef: React.RefObject<Nullable<HTMLElement>>
) {
  const gameEl = getBracketGameElement(gameId);
  const scroller = scrollerRef;
  if (!gameEl || !scroller?.current) return;
  scrollToElement(gameEl, scroller, 64);
}
