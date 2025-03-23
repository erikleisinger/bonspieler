import type { Nullable } from "@/shared/types";
import { useAppSelector } from "@/lib/store";
import { getBracketGamesSchedule } from "@/entities/Bracket/BracketGame";
import { Button } from "@/shared/ui/button";
import { FaEye } from "react-icons/fa";
import { scrollToGame } from "@/entities/Bracket/lib/scrollToGame";
export default function SelectDrawNumberButton({
  drawNumber,
  onClick,
  selected,
}: {
  drawNumber: number;
  onClick: () => void;
  selected: boolean;
}) {
  const schedule = useAppSelector(getBracketGamesSchedule);

  const variant = selected ? "default" : "ghost";

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
    <Button size="icon" variant={variant} onClick={onClick}>
      <FaEye />
    </Button>
  );
}
