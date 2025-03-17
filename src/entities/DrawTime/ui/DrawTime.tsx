import { useMemo } from "react";
import { format } from "date-fns";
export default function DrawTime({
  gameId,
  schedule,
  drawTimes,
}: {
  gameId: string;
  schedule: { [gameId: string]: number };
  drawTimes: { [drawNum: number]: Date };
}) {
  const drawTime = useMemo(() => {
    const drawNumber = drawTimes[schedule[gameId]];
    if (!drawNumber) return "No draw time";
    return format(drawNumber, "h:mm aaa • EEEE, MMM do");
  }, [schedule[gameId], drawTimes[schedule[gameId]]]);
  return (
    <div>
      Draw {schedule[gameId]} • {drawTime}
    </div>
  );
}
