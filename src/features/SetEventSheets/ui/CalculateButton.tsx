import { Button } from "@/shared/ui/button";
import { useAppDispatch } from "@/lib/store";
import { setNumSheets } from "@/entities/BracketEvent";
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
  function recalculate() {
    dispatchEvent(setNumSheets(numSheets));
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
