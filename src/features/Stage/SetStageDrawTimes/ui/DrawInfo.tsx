import { Label } from "@/shared/ui/label";
import { useAppSelector } from "@/lib/store";
import { getBracketGamesSchedule } from "@/entities/Bracket/BracketGame";
import { cn } from "@/lib/utils";
import DrawTimeValidation from "./DrawTimeValidation";
import SelectDrawNumberButton from "./SelectDrawNumberButton";
export default function DrawInfo({
  children,
  drawNumber,
  withValidation = false,
}: {
  children?: React.ReactNode;
  drawNumber: number;
  withValidation?: boolean;
}) {
  const schedule = useAppSelector(getBracketGamesSchedule);
  function getNumGamesForDraw(drawNum: number) {
    return Object.values(schedule).filter((i) => i == drawNum)?.length || 0;
  }
  return (
    <div
      className={cn("grid gap-2 items-center grid-cols-[60px,auto,1fr,auto]")}
    >
      <div>
        <div className="flex gap-2">
          <Label htmlFor={"draw-time-" + drawNumber}>Draw {drawNumber}</Label>
        </div>
        <div className="text-xs">{getNumGamesForDraw(drawNumber)} game(s)</div>
      </div>
      {withValidation ? (
        <div className="self-start mt-[0.3rem]">
          <DrawTimeValidation drawNumber={drawNumber} />
        </div>
      ) : (
        <div />
      )}
      {children}

      <SelectDrawNumberButton drawNumber={drawNumber} />
    </div>
  );
}
