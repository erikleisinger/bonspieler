import { useContext, useMemo } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { Button } from "@/shared/ui/button";
import { HiOutlinePlus } from "react-icons/hi";
import {
  FaHeartBroken,
  FaSeedling,
  FaEye,
  FaPencilAlt,
  FaTrophy,
  FaTimes,
} from "react-icons/fa";

import BracketGameTeam from "./BracketGameTeam";
import SeedToggle from "./SeedToggle";

export default function BracketGameInfo({
  children,
  onBack,
}: {
  children?: React.ReactNode;
  onBack?: () => void;
}) {
  const {
    brackets,
    connections,
    readableIdIndex,
    schedule,
    selectedGame,
    scrollToGame,
    selectGame,
  } = useContext(BracketContext);

  const { editing, lookForLoserConnection, removeLoserConnection } = useContext(
    BracketEditingContext
  );

  const gameConnection = useMemo(() => {
    if (!selectedGame) return null;
    return connections[selectedGame.id];
  }, [connections, selectedGame]);

  const isOnlyBracket = brackets.length === 1;

  const isLastBracket =
    !isOnlyBracket && brackets.length - 1 === selectedGame?.bracketNumber;

  const selectedConnections = connections[selectedGame?.id];

  const hasLoser = selectedConnections?.loserTo;
  return (
    <div className="text-glass-foreground grid grid-rows-[auto_1fr] min-h-full">
      <div>
        <div className="flex justify-between  p-4 px-6 ">
          <div>
            <div className="flex gap-2 items-end">
              <h2
                className="text-3xl font-bold cursor-pointer"
                onClick={() => scrollToGame(selectedGame.id)}
              >
                {readableIdIndex[selectedGame.id]}
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
                  <div className="flex" key={index}>
                    {!team?.teamId && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => selectGame(team?.gameId)}
                        className="-ml-2 mr-2"
                        disabled={!team?.gameId}
                      >
                        <FaEye />
                      </Button>
                    )}
                    {team?.teamId === "seed" && (
                      <div className="flex justify-center items-center w-[36px] h-[36px] -ml-2 mr-2">
                        <FaSeedling className="text-emerald-500" />
                      </div>
                    )}
                    <BracketGameTeam
                      team={team}
                      className=" p-2 rounded-sm grow cursor-pointer"
                      showSeed={false}
                    />
                    <SeedToggle
                      className="ml-4"
                      connection={team}
                      game={selectedGame}
                      index={index}
                    />
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-2 ">
              <div
                className="flex gap-4 items-center rounded-md hover:bg-white/50 p-2 cursor-pointer"
                onClick={() => selectGame(gameConnection.winnerTo)}
              >
                <FaTrophy className="text-amber-500 text-xl" />
                <div>
                  <div className="text-xs text-muted">Winner</div>
                  <div className="text-xl font-semibold ">
                    {gameConnection.winnerTo
                      ? readableIdIndex[gameConnection.winnerTo]
                      : "Advances"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div
                  className="flex gap-4 items-center rounded-md hover:bg-white/50 p-2 cursor-pointer grow"
                  onClick={() => selectGame(gameConnection.loserTo)}
                >
                  <FaHeartBroken className="text-red-500 text-xl" />
                  <div>
                    <div className="text-xs text-muted">Loser</div>
                    <div className="text-xl font-semibold ">
                      {gameConnection.loserTo
                        ? readableIdIndex[gameConnection.loserTo]
                        : "Out"}
                    </div>
                  </div>
                </div>
                {editing && !isOnlyBracket && !isLastBracket && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="ml-2 shrink-0"
                    onClick={() =>
                      lookForLoserConnection({
                        gameId: selectedGame.id,
                        bracketNumber: selectedGame.bracketNumber,
                      })
                    }
                  >
                    <FaPencilAlt />
                  </Button>
                )}
                {editing && hasLoser && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="ml-2 shrink-0"
                    onClick={() => removeLoserConnection(selectedGame.id)}
                  >
                    <FaTimes />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
