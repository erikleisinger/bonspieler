import BracketGame from "./BracketGame";
import type { BracketGame as BracketGameType, BracketRows } from "../lib";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { GAME_HEIGHT } from "../lib/constants/game";
import { GAME_ELEMENT_ID_PREFIX } from "../lib/constants/element-id";

export default function Round({
  games,
  rows,
  roundIndex,
}: {
  games: BracketGameType[];
  rows: BracketRows;
  roundIndex: number;
}) {
  const { connections } = useContext(BracketContext);
  const { editing } = useContext(BracketEditingContext);

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

  return (
    <div
      className={`relative  grid `}
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
            <div className="py-4 flex text-xs">
              <BracketGame
                game={game}
                connections={connections[game.id]}
                gameIndex={gameIndex}
                editing={editing}
                elementId={GAME_ELEMENT_ID_PREFIX + game.id}
                selectable={true}
                gridItem={true}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
