import { BracketGameType } from "@/entities/Bracket";
import { DestinationConnection } from "@/entities/Bracket/BracketGameConnections";
import { Brackets, useBracket } from "@/shared/Bracket";
import { Nullable } from "@/shared/types";

import { useMemo } from "react";
export default function NextStageConnectionViewer({
  onGameClick,
  stageId,
  tournamentId,
  currentWinnerConnection,
}: {
  onGameClick?: (game: BracketGameType) => void;
  stageId: string;
  tournamentId: string;
  currentWinnerConnection: Nullable<DestinationConnection>;
}) {
  const {
    loserConnections,
    winnerConnections,
    originConnections,
    readableIdIndex,
    brackets,
    schedule,
  } = useBracket(stageId);

  const currentConnection = currentWinnerConnection?.gameId;

  const { backgroundGameIds, availableGameIds } = useMemo(() => {
    if (currentConnection) {
      const games = brackets.flat().flat();
      return {
        backgroundGameIds: games
          .filter(({ id }) => id !== currentConnection)
          .map(({ id }) => id),
        availableGameIds: [currentConnection],
      };
    }

    return brackets
      .flat()
      .flat()
      .reduce(
        (all, { id }) => {
          if (
            !originConnections[id] ||
            originConnections[id]?.length < 2 ||
            originConnections[id].some(({ gameId }) => !gameId)
          )
            return {
              ...all,
              availableGameIds: [...all.availableGameIds, id],
            };

          return {
            ...all,
            backgroundGameIds: [...all.backgroundGameIds, id],
          };
        },
        {
          backgroundGameIds: [],
          availableGameIds: [],
        }
      );
  }, [originConnections, brackets, currentConnection]);

  return (
    <Brackets
      availableGameIds={availableGameIds}
      schedule={schedule}
      winnerConnections={winnerConnections}
      loserConnections={loserConnections}
      readableIdIndex={readableIdIndex}
      brackets={brackets}
      originConnections={originConnections}
      onGameResultClick={() => {}}
      onGameClick={onGameClick}
      backgroundGameIds={backgroundGameIds}
      tournamentId={tournamentId}
      stageId={stageId}
    ></Brackets>
  );
}
