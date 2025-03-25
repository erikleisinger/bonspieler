import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function Draggable({
  children,
  disabled,
  id,
}: {
  children: React.ReactNode;
  disabled: boolean;
  id;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
