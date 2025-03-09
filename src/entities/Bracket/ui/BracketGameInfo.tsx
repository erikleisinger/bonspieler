import { useContext, useMemo } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { Button } from "@/shared/ui/button";
import { HiOutlinePlus } from "react-icons/hi";
import { FaHeartBroken } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import BracketGameTeam from "./BracketGameTeam";
export default function BracketGameInfo({
  children,
  onBack,
}: {
  children?: React.ReactNode;
  onBack?: () => void;
}) {
  const { connections, schedule, selectedGame, scrollToGame, selectGame } =
    useContext(BracketContext);

  const gameConnection = useMemo(() => {
    if (!selectedGame) return null;
    return connections[selectedGame.id];
  }, [connections, selectedGame]);
  return (
    <div className="text-glass-foreground">
      <div className="flex justify-between  p-4 px-6 ">
        <div>
          <div className="flex gap-2 items-end">
            <h2
              className="text-3xl font-bold cursor-pointer"
              onClick={() => scrollToGame(selectedGame.id)}
            >
              {selectedGame.id}
            </h2>
          </div>
          <div className="text-muted text-sm">
            May 9 @ 4:30 pm • Draw {schedule[selectedGame.id]}
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={onBack}>
          <HiOutlinePlus
            className="rotate-45"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        </Button>
      </div>

      {selectedGame?.id && gameConnection && (
        <div className="p-4 py-2  md:p-8 md:pb-4  md:bg-transparent">
          <div className=" grid-rows-2 gap-2 hidden md:grid mb-4">
            {gameConnection.teams.map((team, index) => {
              return (
                <BracketGameTeam
                  key={index}
                  team={team}
                  className="w-full p-2 rounded-sm grow cursor-pointer"
                  onClick={(gameId) => selectGame(gameId)}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-2 ">
            <div
              className="flex gap-4 items-center rounded-md hover:bg-black/10 p-2 cursor-pointer"
              onClick={() => selectGame(gameConnection.winnerTo)}
            >
              <FaTrophy className="text-amber-500 text-xl" />
              <div>
                <div className="text-xs text-muted">Winner</div>
                <div className="text-xl font-semibold ">
                  {gameConnection.winnerTo || "Advances"}
                </div>
              </div>
            </div>
            <div
              className="flex gap-4 items-center rounded-md hover:bg-black/10 p-2 cursor-pointer"
              onClick={() => selectGame(gameConnection.loserTo)}
            >
              <FaHeartBroken className="text-red-500 text-xl" />
              <div>
                <div className="text-xs text-muted">Loser</div>
                <div className="text-xl font-semibold ">
                  {gameConnection.loserTo || "Eliminated"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
