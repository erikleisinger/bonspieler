import { Button } from "@/shared/ui/button";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import BracketGameTeam from "@/modules/bracket-manager/shared/ui/BracketGameTeam";
import BracketGameViewerHeader from "./BracketGameViewerHeader";
import BracketGameViewerConnection from "./BracketGameViewerConnection";
import { Nullable } from "@/shared/types";
import { BracketGame } from "@/modules/bracket-manager/shared/types";
import {
  useBracketSelector,
  useBracketDispatch,
} from "@/modules/bracket-manager/shared/hooks";
import {
  getSelectedGame,
  getOriginConnectionsForGame,
  getLoserConnectionForGame,
  getWinnerConnectionForGame,
  removeLoserConnectionForGame,
  setSelectedGame,
  beginLookingForLoserConnection,
} from "@/modules/bracket-manager/shared/store";

export default function BracketGameViewer({
  drawTimeChildren,
  onEditLoserConnection,
  onRemoveLoserConnection,
}: {
  drawTimeChildren?: React.ReactNode;
  onEditLoserConnection?: (game: Nullable<BracketGame>) => void;
  onRemoveLoserConnection?: (game: Nullable<BracketGame>) => void;
}) {
  const dispatch = useBracketDispatch();

  const game = useBracketSelector(getSelectedGame);
  const originConnections = useBracketSelector(
    getOriginConnectionsForGame,
    game?.id
  );
  const winnerConnection = useBracketSelector(
    getWinnerConnectionForGame,
    game?.id
  );
  const loserConnection = useBracketSelector(
    getLoserConnectionForGame,
    game?.id
  );

  const atLeastTwoConnections = new Array(2)
    .fill({
      gameId: null,
      isWinner: false,
    })
    .map((e, i) => {
      if (originConnections[i]) return originConnections[i];
      return e;
    });

  function viewConnection(gameId: Nullable<string>) {
    if (!gameId) return;
    dispatch(setSelectedGame, { game: gameId });
  }

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
                    onClick={() => viewConnection(connection?.gameId || null)}
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
              onClick={() => viewConnection(winnerConnection?.gameId || null)}
            />
            <div className="flex items-center">
              <div className="grow">
                <BracketGameViewerConnection
                  isLoser={true}
                  connection={loserConnection}
                  onClick={() =>
                    viewConnection(loserConnection?.gameId || null)
                  }
                />
              </div>

              {!loserConnection?.gameId && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="ml-2 shrink"
                  onClick={() =>
                    dispatch(beginLookingForLoserConnection, {
                      gameId: game?.id,
                    })
                  }
                >
                  <FaPencilAlt />
                </Button>
              )}
              {!!loserConnection?.gameId && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="ml-2 shrink"
                  onClick={() =>
                    dispatch(removeLoserConnectionForGame, { gameId: game?.id })
                  }
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
