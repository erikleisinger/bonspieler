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
import { Button } from "@/shared/ui/button";

export default function Round({
  bracketNumber,
  games,
  rows,
  roundIndex,
  emptySlots,
}: {
  bracketNumber: number;
  games: BracketGameType[];
  rows: BracketRows;
  roundIndex: number;
  emptySlots: (BracketRow & { index: number })[];
}) {
  const GAME_PADDING = 16;

  const { connections, selectGame } = useContext(BracketContext);
  const {
    editing,
    addGameToRound,
    lookingForWinnerConnection,
    addWinnerConnection,
  } = useContext(BracketEditingContext);

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

  function handleAddGame() {
    addGameToRound({
      bracketNumber,
      roundNumber: roundIndex,
      onSuccess: (game) => {
        selectGame(game);
      },
    });
  }

  function onClickEmptySlot(gameIndex: number) {
    if (!lookingForWinnerConnection) {
      addGameToRound({
        bracketNumber,
        roundNumber: roundIndex,
        gameIndex,
      });
    } else {
      addGameToRound({
        bracketNumber,
        roundNumber: roundIndex,
        gameIndex,
        onSuccess: (game) => {
          addWinnerConnection(game.id);
        },
      });
    }
  }

  return (
    <div className="pointer-events-none">
      <header className="sticky  right-0 top-2 z-10 p-2 text-glass-foreground font-semibold bg-glass shadow-sm backdrop-blur-sm text-center mx-1 rounded-sm pointer-events-auto">
        Round {roundIndex + 1}
        <Button
          className="absolute right-0 top-0 bottom-0 m-auto"
          variant="ghost"
          size="icon"
          onClick={handleAddGame}
        >
          +
        </Button>
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
        {/* {emptySlots?.length &&
          emptySlots.map(
            ({ rowStart, rowEnd, index: gameIndex, offset }, index) => {
              return (
                <div
                  key={index}
                  style={{
                    gridRow: `${rowStart} / ${rowEnd}`,
                  }}
                  className="hover:bg-gray-500/10 bg-gray-500/5 pointer-events-auto cursor-pointer rounded-xl mr-8 my-2"
                  onClick={() => onClickEmptySlot(gameIndex)}
                />
              );
            }
          )} */}
      </div>
    </div>
  );
}
