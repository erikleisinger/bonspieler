import Typography from "@/shared/ui/typography";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";

export default function DateBlock({
  date,
  selected,
  onClick,
}: {
  date: Date;
  selected?: boolean;
  onClick: () => void;
}) {
  const month = format(date, "LLL");
  const day = format(date, "dd");
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "w-fit p-7 py-9 aspect-square flex flex-col items-center justify-center rounded-md",
        selected
          ? "bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white"
          : "text-indigo-500 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-600"
      )}
    >
      <Typography
        tag="h5"
        className="text-sm uppercase text-center leading-[1]"
      >
        {month}
      </Typography>
      <div className="text-3xl font-bold leading-[1] text-center uppercase">
        {day}
      </div>
    </Button>
  );
}
