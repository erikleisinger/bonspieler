import { useId } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FaMinus, FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function NumberInput({
  id,
  label,
  hideButtons = false,
  min = 0,
  max,
  value,
  setValue,
}: {
  id?: string;
  hideButtons?: boolean;
  label?: string;
  min?: number;
  max?: number;
  value: number;
  setValue: (newValue: number) => void;
}) {
  const randomId = useId();
  const inputId = id || randomId;

  function handleChange(e) {
    const newValue = Number(e.target.value);
    if (isNaN(newValue)) return;
    if (newValue < min) return;
    if (max && newValue > max) return;
    setValue(Number(e.target.value));
    console.log("handle change: ", e);
  }

  function incrementValue(increment: number) {
    if (min && value + increment < min) return;
    if (max && value + increment > max) return;
    setValue(value + increment);
  }
  return (
    <div className="w-fit">
      {label && (
        <div className="flex justify-center mb-2">
          <label htmlFor={inputId} className="font-koulen">
            {label}
          </label>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          onClick={() => incrementValue(-1)}
          className={cn(hideButtons && "hidden")}
        >
          <FaMinus />
        </Button>
        <Input
          id={inputId}
          value={value}
          onChange={handleChange}
          className="h-[100px] w-[100px] text-center focus-visible:ring:transparent"
          style={{
            fontSize: "4rem",
          }}
        ></Input>
        <Button
          size="icon"
          onClick={() => incrementValue(+1)}
          className={cn(hideButtons && "hidden")}
        >
          <FaPlus></FaPlus>
        </Button>
      </div>
    </div>
  );
}
