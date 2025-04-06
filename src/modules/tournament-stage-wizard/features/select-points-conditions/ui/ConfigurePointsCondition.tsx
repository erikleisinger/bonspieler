import Typography from "@/shared/ui/typography";
import { Slider } from "@/shared/ui/slider";

export default function ConfigurePointsCondition({
  value,
  title,
  description,
  setValue,
}: {
  value: number[];
  title: string;
  description: string;
  setValue: (value: number[]) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <Typography tag="h6">{title}</Typography>
        <Typography tag="p" className="text-sm italic">
          {description}
        </Typography>
      </div>
      <div className="flex flex-col justify-center gap-1">
        <div className="relative">
          <Slider
            min={-5}
            max={5}
            step={0.25}
            value={value}
            onValueChange={setValue}
          />
          <div className="flex justify-end text-xs absolute right-0 bottom-[-4px] translate-y-full">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
