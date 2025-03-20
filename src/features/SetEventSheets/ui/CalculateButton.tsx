import { Button } from "@/shared/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setBracketEventSchedule,
  getBracketEventBrackets,
} from "@/entities/Bracket/BracketGame";
import { getDrawTimes, setDrawTimes } from "@/entities/DrawTime";
import { getOriginConnections } from "@/entities/Bracket/BracketGameConnections";
import { setNumSheets } from "@/entities/BracketEvent";
import { scheduleTournament } from "@erikleisinger/bracket-generator";
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
  const brackets = useAppSelector(getBracketEventBrackets);
  const drawTimes = useAppSelector(getDrawTimes);

  function structureConnections() {
    const games = brackets.flat().flat();
    return games.reduce((all, { id: gameId }) => {
      return {
        ...all,
        [gameId]: {
          teams: originConnections[gameId] || [
            {
              gameId: null,
            },
            { gameId: null },
          ],
        },
      };
    }, {});
  }

  function recalculate() {
    dispatch(setNumSheets(numSheets));

    const { schedule } = scheduleTournament(structureConnections(), numSheets);
    dispatch(setBracketEventSchedule(schedule));
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
