import { useContext } from "react";
import { Button } from "@/shared/ui/button";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import { BracketGameTeam, BracketGameType } from "@/entities/Bracket";
import { useAppDispatch } from "@/lib/store";
import { setSelectedGame } from "@/widgets/Bracket/BracketViewer";

import BracketGameViewerHeader from "./BracketGameViewerHeader";
import BracketGameViewerConnection from "./BracketGameViewerConnection";
import { Nullable } from "@/shared/types";
import { BracketContext } from "@/shared/Bracket/BracketContext";

export default function BracketGameViewer({
  drawTimeChildren,
  game,
  onEditLoserConnection,
  onRemoveLoserConnection,
}: {
  drawTimeChildren?: React.ReactNode;
  game: BracketGameType;
  onEditLoserConnection?: (game: Nullable<BracketGameType>) => void;
  onRemoveLoserConnection?: (game: Nullable<BracketGameType>) => void;
}) {
  const {
    originConnections: allOriginConnections,
    winnerConnections,
    loserConnections,
  } = useContext(BracketContext);

  const winnerConnection = winnerConnections[game.id];
  const loserConnection = loserConnections[game.id];
  const originConnections = allOriginConnections[game.id] || [];

  const dispatch = useAppDispatch();
  function selectGame(gameId: string) {
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
      <BracketGameViewerHeader game={game}>
        {drawTimeChildren}
      </BracketGameViewerHeader>

      {game?.id && (
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
            <div className="flex items-center">
              <div className="grow">
                <BracketGameViewerConnection
                  isLoser={true}
                  connection={loserConnection}
                />
              </div>

              {onEditLoserConnection && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="ml-2 shrink"
                  onClick={() => onEditLoserConnection(game)}
                >
                  <FaPencilAlt />
                </Button>
              )}
              {onRemoveLoserConnection && !!loserConnection && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="ml-2 shrink"
                  onClick={() => onRemoveLoserConnection(game)}
                >
                  <FaTrashAlt />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
