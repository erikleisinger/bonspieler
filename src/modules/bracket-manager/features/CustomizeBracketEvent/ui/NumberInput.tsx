import { useId } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function NumberInput({
  label,
  min = 0,
  max,
  value,
  setValue,
}: {
  label: string;
  min?: number;
  max?: number;
  value: number;
  setValue: (newValue: number) => void;
}) {
  const inputId = useId();

  function handleChange(e) {
    setValue(Number(e.target.value));
  }

  function incrementValue(increment: number) {
    if (min && value + increment < min) return;
    if (max && value + increment > max) return;
    setValue(value + increment);
  }
  return (
    <div className="w-fit">
      <div className="flex justify-center mb-2">
        <label htmlFor={inputId} className="font-koulen">
          {label}
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" onClick={() => incrementValue(-1)}>
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
        <Button size="icon" onClick={() => incrementValue(+1)}>
          <FaPlus></FaPlus>
        </Button>
      </div>
    </div>
  );
}
