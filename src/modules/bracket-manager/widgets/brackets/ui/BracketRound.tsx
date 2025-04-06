import { GAME_HEIGHT, GAME_PADDING } from "../lib/constants/style";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { BracketContext } from "../lib/context/BracketContext";
export default function BracketRound({
  bracketNumber,
  children,
  roundNumber,
}: {
  bracketNumber: number;
  children?: React.ReactNode;
  roundNumber: number;
}) {
  const { brackets, rows, size } = useContext(BracketContext);

  const isSmall = size !== "full";

  function getRowDefinition() {
    const rowHeight =
      (isSmall ? 15 : GAME_HEIGHT + GAME_PADDING) /
      (!roundNumber ? 1 : 2 ** roundNumber);

    const games = brackets[bracketNumber][roundNumber];

    const numRowsForRound = Math.max(
      ...[...games.map(({ id }) => rows[id]?.rowEnd || 1)]
    );

    return {
      gridTemplateRows: `repeat(${
        numRowsForRound + 2 ** roundNumber
      }, ${rowHeight}px)`,
      minWidth: isSmall ? "unset" : "220px",
    };
  }

  return (
    <div
      className={cn(" bracket-row z-10 transition-all", isSmall && "w-[50px]")}
    >
      {!isSmall && <div className="h-8" />}

      <div
        className={`relative  grid transition-all `}
        style={{
          ...getRowDefinition(),
        }}
      >
        {children}
      </div>
    </div>
  );
}
