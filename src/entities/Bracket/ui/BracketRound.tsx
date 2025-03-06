import BracketGame from "./BracketGame";
import type {
  BracketGame as BracketGameType,
  BracketConnections,
  BracketRows,
} from "../lib";

export default function Round({
  games,
  connections,
  rows,
  roundIndex,
}: {
  games: BracketGameType[];
  connections: BracketConnections;
  rows: BracketRows;
  roundIndex: number;
}) {
  const GAME_HEIGHT = 100;

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
      {games.map((game: BracketGameType) => {
        return (
          <div
            key={game.id}
            className="flex flex-col justify-center "
            style={{
              ...getRowSpanForGame(game),
            }}
          >
            <div className=" py-4">
              <BracketGame game={game} connections={connections[game.id]} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
