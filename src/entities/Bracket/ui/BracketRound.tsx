import BracketGame from "./BracketGame";

export default function Round({ games, connections, rows }) {
  const GAME_HEIGHT = 125;

  function getRowSpanForGame(game) {
    return {
      gridRow: "span " + rows[game.id],
    };
  }

  function getRowDefinition() {
    const numRows = games.reduce((all, current) => {
      const rowsForGame = rows[current.id];
      return all + rowsForGame;
    }, 0);
    return {
      gridTemplateRows: `repeat(${numRows}, ${GAME_HEIGHT}px)`,
    };
  }

  return (
    <div
      className={`relative  grid gap-8`}
      style={{
        ...getRowDefinition(),
      }}
    >
      {games.map((game) => {
        return (
          <div
            key={game.id}
            className="flex flex-col justify-center "
            style={{
              ...getRowSpanForGame(game),
            }}
          >
            <BracketGame game={game} connections={connections[game.id]} />
          </div>
        );
      })}
    </div>
  );
}
