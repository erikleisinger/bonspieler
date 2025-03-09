import { Checkbox } from "@/shared/ui/checkbox.tsx";
import { generateUUID } from "@/shared/utils/generateUUID";
import type { BracketConnectionTeam, BracketGame } from "../lib";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { useContext } from "react";
export default function SeedToggle({
  className,
  connection,
  game,
  index,
}: {
  className?: string;
  connection: BracketConnectionTeam;
  game: BracketGame;
  index: number;
}) {
  const { toggleSeed } = useContext(BracketEditingContext);
  const id = generateUUID();
  const isFirstRoundFirstBracket =
    game.bracketNumber === 0 && game.roundNumber === 0;
  const disabled = isFirstRoundFirstBracket || !!connection?.gameId;

  const checked = connection?.teamId === "seed";

  function handleToggleSeed(checked: boolean) {
    if (checked) {
      toggleSeed({
        gameId: game.id,
        index,
        teamId: "seed",
      });
    } else {
      toggleSeed({
        gameId: game.id,
        index,
        teamId: null,
      });
    }
  }
  return (
    <div className={"flex items-center gap-2 " + className}>
      <Checkbox
        id={id}
        disabled={disabled}
        checked={checked}
        onCheckedChange={handleToggleSeed}
      />
      <label htmlFor={id}>Seed</label>
    </div>
  );
}
