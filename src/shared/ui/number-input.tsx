import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { useId } from "react";
export default function NumberInput({
  number,
  max,
  min = 1,
  setNumber,
  children,
  readOnly = false,
}: {
  number: number;
  min?: number;
  max?: number;
  setNumber: (number: number) => void;
  children: React.ReactNode;
  readOnly?: boolean;
}) {
  const id = useId();

  function updateNumber(amount: number) {
    if (readOnly) return;
    if (number + amount < min) return;
    if (max && number + amount > max) return;
    setNumber(number + amount);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{children}</Label>
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0"
          disabled={readOnly}
          onClick={() => updateNumber(-1)}
        >
          -
        </Button>
        <Input
          id={id}
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          max={max}
          min={min}
          readOnly={readOnly}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0"
          disabled={readOnly}
          onClick={() => updateNumber(1)}
        >
          +
        </Button>
      </div>
    </div>
  );
}
