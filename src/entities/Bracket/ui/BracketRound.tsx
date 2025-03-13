import BracketGame from "./BracketGame";
import type {
  BracketGame as BracketGameType,
  BracketRows,
  BracketRow,
} from "../lib";
import { useContext, useMemo } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { GAME_HEIGHT } from "../lib/constants/game";
import { GAME_ELEMENT_ID_PREFIX } from "../lib/constants/element-id";
import { format } from "date-fns";

export default function Round({
  games,
  rows,
  roundIndex,
  emptySlots,
}: {
  games: BracketGameType[];
  rows: BracketRows;
  roundIndex: number;
  emptySlots: (BracketRow & { index: number })[];
}) {
  const GAME_PADDING = 16;

  const { connections, schedule, drawTimes } = useContext(BracketContext);
  const { editing } = useContext(BracketEditingContext);

  function getRowSpanForGame(game: BracketGameType) {
    const { rowStart = 1, rowEnd = 2 } = rows[game.id] || {};
    return {
      gridRow: `${rowStart} / ${rowEnd}`,
    };
  }

  function getRowDefinition() {
    const rowHeight =
      (GAME_HEIGHT + GAME_PADDING) / (!roundIndex ? 1 : 2 ** roundIndex);

    const numRowsForRound = Math.max(
      ...[
        ...(emptySlots ? emptySlots.map(({ rowEnd }) => rowEnd) : []),
        ...games.map(({ id }) => rows[id]?.rowEnd || 1),
      ]
    );

    return {
      gridTemplateRows: `repeat(${
        numRowsForRound + 2 ** roundIndex
      }, ${rowHeight}px)`,
    };
  }

  const roundDrawTimes = useMemo(() => {
    const times: number[] = [];
    games.forEach(({ id }) => {
      const drawNum = schedule[id];
      if (!times.includes(drawNum)) times.push(drawNum);
    });

    return (
      times
        .map((num) => {
          if (!drawTimes[num]) return null;
          return format(drawTimes[num], "h:mm aaa • MMM do");
        })
        .filter(Boolean)
        .join(" | ") || "Draw times not scheduled"
    );
  }, [games, schedule, drawTimes]);

  return (
    <div className="pointer-events-none">
      <header className="sticky  right-0 top-2 z-10 p-2 text-glass-foreground font-semibold bg-glass shadow-sm backdrop-blur-sm text-center mx-1 rounded-sm pointer-events-auto">
        <div>Round {roundIndex + 1}</div>
        <div className="text-xs font-normal">{roundDrawTimes}</div>
      </header>
      <div
        className={`relative  grid px-8 md:px-16 pt-4 md:pt-8 w-screen md:w-fit`}
        style={{
          ...getRowDefinition(),
        }}
      >
        {games.map((game: BracketGameType, gameIndex: number) => {
          return (
            <div
              key={game.id}
              className="flex flex-col justify-center "
              style={{
                ...getRowSpanForGame(game),
              }}
            >
              <div className="py-4 flex text-xs pointer-events-auto">
                <BracketGame
                  game={game}
                  connections={connections[game.id]}
                  gameIndex={gameIndex}
                  editing={editing}
                  elementId={GAME_ELEMENT_ID_PREFIX + game.id}
                  selectable={true}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
