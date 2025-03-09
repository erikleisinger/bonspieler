import { GAME_ELEMENT_ID_PREFIX } from "./constants/element-id";
export function getBracketGameElement(gameId: string) {
  return document.getElementById(GAME_ELEMENT_ID_PREFIX + gameId);
}
