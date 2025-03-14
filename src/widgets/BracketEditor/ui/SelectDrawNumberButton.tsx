import type { Nullable } from "@/shared/types";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { Button } from "@/shared/ui/button";
import { FaEye } from "react-icons/fa";
import { scrollToGame } from "@/entities/Bracket/lib/scrollToGame";
export default function SelectDrawNumberButton({
  drawNumber,
}: {
  drawNumber: number;
}) {
  const { selectedDraw, setSelectedDraw } = useContext(BracketEditingContext);
  const { schedule } = useContext(BracketContext);

  const variant = selectedDraw === drawNumber ? "default" : "ghost";

  function toggleSelected() {
    if (selectedDraw === drawNumber) {
      setSelectedDraw(null);
    } else {
      setSelectedDraw(drawNumber);
      scrollToFirstGame();
    }
  }

  function findFirstGameForDrawNumber(): Nullable<string> {
    const first = Object.entries(schedule).find(([_, drawNum]) => {
      return drawNum === drawNumber;
    });

    if (first) return first[0];
    return null;
  }

  function scrollToFirstGame() {
    const gameId = findFirstGameForDrawNumber();
    if (gameId) scrollToGame(gameId);
  }
  return (
    <Button size="icon" variant={variant} onClick={toggleSelected}>
      <FaEye />
    </Button>
  );
}
