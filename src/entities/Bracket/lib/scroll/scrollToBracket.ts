import { Nullable } from "@/shared/types";
import { scrollToElement } from "./scrollToElement";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "../constants/element-id";
export function scrollToBracket(
  bracketIndex: number,
  scrollerRef: React.RefObject<Nullable<HTMLElement>>
) {
  const bracketHeaderEl = document.getElementById(
    BRACKET_CONTAINER_ELEMENT_ID_PREFIX + bracketIndex
  );
  if (!bracketHeaderEl || !scrollerRef?.current) return;

  scrollToElement(bracketHeaderEl, scrollerRef);
}
