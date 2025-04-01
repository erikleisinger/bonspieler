import { Nullable } from "@/shared/types";

export function scrollToElement(
  element: Nullable<HTMLElement>,
  scrollerRef: React.RefObject<Nullable<HTMLElement>>,
  padding: number = 0
) {
  if (!scrollerRef?.current || !element) return;
  const elementRect = element.getBoundingClientRect();
  const scrollerRect = scrollerRef.current.getBoundingClientRect();
  // scroll to game position within scroller
  const absolutePositionX = elementRect.left - scrollerRect.left;
  const scrollPositionX = absolutePositionX + scrollerRef.current.scrollLeft;
  const absolutePositionY = elementRect.top - scrollerRect.top;
  const scrollPositionY = absolutePositionY + scrollerRef.current.scrollTop;
  scrollerRef.current.scrollTo({
    left: Math.max(scrollPositionX - padding, 0),
    top: Math.max(scrollPositionY - padding, 0),
    behavior: "smooth",
  });
}
