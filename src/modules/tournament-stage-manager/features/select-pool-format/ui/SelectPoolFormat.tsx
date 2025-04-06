import { cn } from "@/lib/utils";
import PoolFormatCard from "./PoolFormatCard";
export default function SelectPoolFormat({
  className,
  selection,
  setSelection,
}: {
  className?: string;
  selection: number;
  setSelection: (value: number) => void;
}) {
  return (
    <div className={cn("grid grid-cols-2  gap-4", className)}>
      <PoolFormatCard type="RoundRobin" selected={selection === "RoundRobin"} />
      <PoolFormatCard type="Swiss" selected={selection === "Swiss"} />
      <PoolFormatCard type="Random" selected={selection === "Random"} />
    </div>
  );
}
