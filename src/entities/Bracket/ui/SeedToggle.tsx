import { Checkbox } from "@/shared/ui/checkbox";
import { generateUUID } from "@/shared/utils/generateUUID";
import type { BracketConnectionTeam, BracketGame } from "../types";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { useContext } from "react";
import Tooltip from "@/shared/ui/tooltip";
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

  const disabledTooltip = isFirstRoundFirstBracket
    ? "Games in the first round of the first bracket must be seeded."
    : !!connection?.gameId
    ? "This game is already connected to another game."
    : "";

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
    <Tooltip text={disabledTooltip} disabled={!disabledTooltip}>
      <div className={"flex items-center gap-2 " + className}>
        <Checkbox
          id={id}
          disabled={!!disabledTooltip}
          checked={checked}
          onCheckedChange={handleToggleSeed}
        />
        <label htmlFor={id}>Seed</label>
      </div>
    </Tooltip>
  );
}
