import { Button } from "@/shared/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getBracketEventConnections,
  setBracketSchedule,
} from "@/entities/BracketEvent";
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

  const connections = useAppSelector(getBracketEventConnections);

  function recalculate() {
    dispatch(setNumSheets(numSheets));
    const { schedule } = scheduleTournament(connections, numSheets);
    dispatch(setBracketSchedule(schedule));
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
