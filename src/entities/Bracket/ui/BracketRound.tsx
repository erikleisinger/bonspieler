import BracketGame from "./BracketGame";
import type { BracketGame as BracketGameType, BracketRows } from "../lib";
import { useContext } from "react";
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
}: {
  bracketNumber: number;
  games: BracketGameType[];
  rows: BracketRows;
  roundIndex: number;
}) {
  const { connections, selectGame } = useContext(BracketContext);
  const { editing, addGameToRound, lookingForLoserConnection } = useContext(
    BracketEditingContext
  );

  function getRowSpanForGame(game: BracketGameType) {
    const { rowStart = 1, rowEnd = 2 } = rows[game.id] || {};
    return {
      gridRow: `${rowStart} / ${rowEnd}`,
    };
  }

  function getRowDefinition() {
    let gameHeight = GAME_HEIGHT;
    const arr = new Array(roundIndex).fill(null);
    arr.forEach(() => {
      let newGameHeight = gameHeight / 2;
      gameHeight = newGameHeight;
    });

    let numRowsForRound = games.reduce((all, current) => {
      const { rowEnd = 2 } = rows[current.id] || {};

      if (rowEnd > all) return rowEnd;
      return all;
    }, 0);

    return {
      gridTemplateRows: `repeat(${numRowsForRound}, ${gameHeight}px)`,
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
      </div>
    </div>
  );
}
