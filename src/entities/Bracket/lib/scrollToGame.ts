import { getBracketGameElement } from "./getBracketGameElement";
export function scrollToGame(
  gameId: string,
  params: {
    block?: "start" | "center" | "end";
    inline?: "start" | "center" | "end";
  } = {
    block: "center",
    inline: "center",
  }
) {
  const gameEl = getBracketGameElement(gameId);
  if (!gameEl) return;
  // gameEl.scrollIntoView({
  //   behavior: "smooth",
  //   ...params,
  // });
}
