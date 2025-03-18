import { useMemo } from "react";
import { Button } from "@/shared/ui/button";
import { FaSeedling, FaEye } from "react-icons/fa";

import { BracketGameTeam } from "@/entities/Bracket";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getSelectedGame,
  setSelectedGame,
  getBracketEventConnections,
} from "@/entities/BracketEvent";
import { scrollToGame } from "@/entities/Bracket";
import BracketGameViewerHeader from "./BracketGameViewerHeader";
import BracketGameViewerConnection from "./BracketGameViewerConnection";

export default function BracketGameViewer({
  drawTimeChildren,
  onBack = () => {},
}: {
  drawTimeChildren?: React.ReactNode;
  onBack?: () => void;
}) {
  const connections = useAppSelector(getBracketEventConnections);

  const selectedGame = useAppSelector(getSelectedGame);

  const dispatch = useAppDispatch();
  function selectGame(gameId: string) {
    scrollToGame(gameId);
    dispatch(setSelectedGame(gameId));
  }

  const gameConnection = useMemo(() => {
    if (!selectedGame) return null;
    return connections[selectedGame.id];
  }, [connections, selectedGame]);

  return (
    <div className="text-glass-foreground grid grid-rows-[auto_1fr] min-h-full">
      <BracketGameViewerHeader close={onBack} game={selectedGame}>
        {drawTimeChildren}
      </BracketGameViewerHeader>

      {selectedGame && gameConnection && (
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
                    className=" p-2 rounded-sm grow "
                    showSeed={false}
                  />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 ">
            <BracketGameViewerConnection isWinner={true} game={selectedGame} />
            <BracketGameViewerConnection isLoser={true} game={selectedGame} />
          </div>
        </div>
      )}
    </div>
  );
}
