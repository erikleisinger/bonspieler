import { useMemo } from "react";
import { Button } from "@/shared/ui/button";
import { FaSeedling, FaEye } from "react-icons/fa";

import { BracketGameTeam } from "@/entities/Bracket";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getSelectedGame } from "@/entities/BracketEvent";
import {
  getWinnerConnectionsForGame,
  getLoserConnectionsForGame,
  getOriginConnectionsForGame,
} from "@/entities/Bracket/BracketGameConnections";
import { setSelectedGame } from "@/entities/BracketEvent";
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
  const selectedGame = useAppSelector(getSelectedGame);
  const winnerConnection = useAppSelector((state) =>
    getWinnerConnectionsForGame(state, selectedGame?.id)
  );
  const loserConnection = useAppSelector((state) =>
    getLoserConnectionsForGame(state, selectedGame?.id)
  );
  const originConnections =
    useAppSelector((state) =>
      getOriginConnectionsForGame(state, selectedGame?.id)
    ) || [];

  const dispatch = useAppDispatch();
  function selectGame(gameId: string) {
    scrollToGame(gameId);
    dispatch(setSelectedGame(gameId));
  }

  const atLeastTwoConnections = new Array(2)
    .fill({
      gameId: null,
      isWinner: false,
    })
    .map((e, i) => {
      if (originConnections[i]) return originConnections[i];
      return e;
    });

  return (
    <div className="text-glass-foreground grid grid-rows-[auto_1fr] min-h-full">
      <BracketGameViewerHeader close={onBack} game={selectedGame}>
        {drawTimeChildren}
      </BracketGameViewerHeader>

      {selectedGame && (
        <div className="p-4 py-2  md:p-8 md:pb-4  md:bg-transparent">
          <div className=" grid-rows-2 gap-2 hidden md:grid mb-4">
            {atLeastTwoConnections.map((connection, index) => {
              return (
                <div className="flex" key={index}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => selectGame(connection?.gameId)}
                    className="-ml-2 mr-2"
                    disabled={!connection?.gameId}
                  >
                    <FaEye />
                  </Button>

                  <BracketGameTeam
                    connection={connection}
                    className=" p-2 rounded-sm grow "
                    isSeed={selectedGame.isSeed}
                  />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 ">
            <BracketGameViewerConnection
              isWinner={true}
              connection={winnerConnection}
            />
            <BracketGameViewerConnection
              isLoser={true}
              connection={loserConnection}
            />
          </div>
        </div>
      )}
    </div>
  );
}
