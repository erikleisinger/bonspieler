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
  const scrollX = element.offsetLeft;
  const absolutePositionY = elementRect.top - scrollerRect.top;
  const scrollPositionY = absolutePositionY + scrollerRef.current.scrollTop;
  scrollerRef.current.scrollTo({
    left: Math.min(scrollX - padding, 0),
    top: scrollPositionY - padding,
    behavior: "smooth",
  });
}
