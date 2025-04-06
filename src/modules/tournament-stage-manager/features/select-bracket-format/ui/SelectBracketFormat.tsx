import { cn } from "@/lib/utils";
import BracketFormatCard from "./BracketFormatCard";
export default function SelectBracketFormat({
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
      <BracketFormatCard
        type="Single"
        setValue={setSelection}
        selected={selection === 1}
      />
      <BracketFormatCard
        type="Double"
        setValue={setSelection}
        selected={selection === 2}
      />
      <BracketFormatCard
        type="Triple"
        setValue={setSelection}
        selected={selection === 3}
      />
      <BracketFormatCard
        type="Quadruple"
        setValue={setSelection}
        selected={selection === 4}
      />
    </div>
  );
}
