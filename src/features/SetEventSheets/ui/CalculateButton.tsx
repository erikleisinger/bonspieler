import { Button } from "@/shared/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setBracketGamesSchedule,
  getBracketGames,
} from "@/entities/Bracket/BracketGame";
import { getDrawTimes, setDrawTimes } from "@/entities/DrawTime";
import { getOriginConnections } from "@/entities/Bracket/BracketGameConnections";
import { setNumSheets } from "@/entities/BracketEvent";
import { scheduleTournament } from "@/shared/utils/generateTournament";
export default function CalculateButton({
  active,
  className = "",
  numSheets,
  onCalculate,
}: {
  active: boolean;
  className?: string;
  numSheets: number;
  onCalculate: () => void;
}) {
  const dispatch = useAppDispatch();

  const originConnections = useAppSelector(getOriginConnections);
  const brackets = useAppSelector(getBracketGames);
  const drawTimes = useAppSelector(getDrawTimes);

  function recalculate() {
    dispatch(setNumSheets(numSheets));

    const { schedule } = scheduleTournament(originConnections, numSheets);
    dispatch(setBracketGamesSchedule(schedule));
    const newNumDrawTimes = Math.max(...Object.values(schedule));
    const newDrawTimes = Array.from({ length: newNumDrawTimes }).reduce(
      (all, _, i) => {
        if (drawTimes[i]) {
          return {
            ...all,
            [i]: drawTimes[i],
          };
        }
        return {
          ...all,
          [i]: null,
        };
      },
      {}
    );
    dispatch(setDrawTimes(newDrawTimes));
    onCalculate();
  }
  return (
    <Button
      className={className}
      variant={active ? "default" : "ghost"}
      onClick={recalculate}
    >
      Recalculate draw order
    </Button>
  );
}
