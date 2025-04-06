import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { useEffect, useId, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
export default function NumberInput({
  autoFocus,
  hideButtons,
  number,
  id,
  max,
  min = 1,
  setNumber,
  children,
  readOnly = false,
  disabled,
}: {
  autoFocus?: boolean;
  hideButtons?: boolean;
  number: number;
  id?: string;
  min?: number;
  max?: number;
  setNumber: (number: number) => void;
  children?: React.ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  const el = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    el.current.focus();
  }, []);

  const autoId = useId();

  const elementId = id || autoId;

  function updateNumber(amount: number) {
    if (readOnly) return;
    setNumber(number + amount);
  }

  const isInvalid = useMemo(() => {
    if (min && number < min) return true;
    if (max && number > max) return true;
    return false;
  }, [min, max, number]);

  function onFocus() {
    if (!el.current) return;
    el.current.select();
  }

  return (
    <div className="flex flex-col gap-2">
      {children && <Label htmlFor={elementId}>{children}</Label>}

      <div className="flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          disabled={readOnly}
          onClick={() => updateNumber(-1)}
          className={cn("shrink-0", hideButtons && "hidden")}
        >
          -
        </Button>
        <Input
          id={elementId}
          ref={el}
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          invalid={isInvalid}
          max={max}
          min={min}
          readOnly={readOnly}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onFocus={onFocus}
          onClick={onFocus}
          disabled={disabled}
        />
        <Button
          size="icon"
          variant="ghost"
          className={cn("shrink-0", hideButtons && "hidden")}
          disabled={readOnly}
          onClick={() => updateNumber(1)}
        >
          +
        </Button>
      </div>
    </div>
  );
}
