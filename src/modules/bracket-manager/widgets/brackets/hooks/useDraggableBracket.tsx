import { useEffect, useState, useRef } from "react";
export function useDraggableBracket({
  ref,
}: {
  ref: React.RefObject<HTMLElement | null>;
}) {
  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    function onDrag(e) {
      if (!dragging.current) return;
      e.preventDefault();
      const { movementX, movementY } = e;
      const { scrollLeft, scrollTop } = ref.current;
      ref.current.scrollLeft = scrollLeft - movementX;
      ref.current.scrollTop = scrollTop - movementY;
    }
    function onDragStart(e) {
      e.preventDefault();
      dragging.current = true;
      setIsDragging(true);
    }

    function onMouseUp(e) {
      e.preventDefault();
      dragging.current = false;
      setTimeout(() => {
        setIsDragging(false);
      }, 1);
    }
    if (ref.current) {
      document.addEventListener("mousemove", onDrag);
      ref.current.addEventListener("dragstart", onDragStart);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      if (ref.current) {
        document.removeEventListener("mousemove", onDrag);
        ref.current.removeEventListener("dragstart", onDragStart);
        document.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [ref]);

  return {
    isDragging,
  };
}
