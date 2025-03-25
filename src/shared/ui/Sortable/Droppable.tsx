import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
export default function Droppable({
  children,
  disabled,
  id,
}: {
  children: React.ReactNode;
  disabled: boolean;
  id: string;
}) {
  const { setNodeRef } = useDroppable({
    id,
    disabled,
  });

  return <div ref={setNodeRef}>{children}</div>;
}
