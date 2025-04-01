import { useAppSelector } from "@/lib/store";
import { getBracketGamesSchedule } from "@/entities/Bracket/BracketGame";
import { Button } from "@/shared/ui/button";
import { FaEye } from "react-icons/fa";

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

  return (
    <Button size="icon" variant={variant} onClick={onClick}>
      <FaEye />
    </Button>
  );
}
