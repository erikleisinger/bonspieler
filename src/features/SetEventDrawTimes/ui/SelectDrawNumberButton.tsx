import type { Nullable } from "@/shared/types";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getBracketEventSchedule,
  getSelectedDraw,
  setSelectedDraw,
} from "@/entities/BracketEvent";
import { Button } from "@/shared/ui/button";
import { FaEye } from "react-icons/fa";
import { scrollToGame } from "@/entities/Bracket/lib/scrollToGame";
export default function SelectDrawNumberButton({
  drawNumber,
}: {
  drawNumber: number;
}) {
  const selectedDraw = useAppSelector(getSelectedDraw);
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(getBracketEventSchedule);

  const variant = selectedDraw === drawNumber ? "default" : "ghost";

  function toggleSelected() {
    if (selectedDraw === drawNumber) {
      dispatch(setSelectedDraw(null));
    } else {
      dispatch(setSelectedDraw(drawNumber));
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
