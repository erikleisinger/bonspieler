import { Button } from "@/shared/ui/button";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
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
  const { updateNumSheets } = useContext(BracketEditingContext);
  function recalculate() {
    updateNumSheets(numSheets, true);
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
