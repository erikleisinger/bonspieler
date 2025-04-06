import { cn } from "@/lib/utils";
import PoolFormatCard from "./PoolFormatCard";
import { PoolFormat } from "@/modules/tournament-stage-wizard/shared/types";
import { Nullable } from "@/shared/types";
export default function SelectPoolFormat({
  className,
  selection,
  setSelection,
}: {
  className?: string;
  selection: Nullable<PoolFormat>;
  setSelection: (value: PoolFormat) => void;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2  gap-4", className)}>
      <PoolFormatCard
        type="RoundRobin"
        selected={selection === "RoundRobin"}
        onClick={() => setSelection("RoundRobin")}
      />

      <PoolFormatCard
        type="Dutch"
        selected={selection === "Dutch"}
        onClick={() => setSelection("Dutch")}
      />
      <PoolFormatCard
        type="Monrad"
        selected={selection === "Monrad"}
        onClick={() => setSelection("Monrad")}
      />
      <PoolFormatCard
        type="Random"
        selected={selection === "Random"}
        onClick={() => setSelection("Random")}
      />
    </div>
  );
}
