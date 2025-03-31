import { BracketGameType } from "@/entities/Bracket";
import { DestinationConnection } from "@/entities/Bracket/BracketGameConnections";
import { Brackets, useBracket } from "@/shared/Bracket";
import { Nullable } from "@/shared/types";

import { useMemo } from "react";
export default function NextStageConnectionViewer({
  onGameClick,
  tournamentId,
  currentWinnerConnection,
}: {
  onGameClick?: (game: BracketGameType) => void;
  tournamentId: string;
  currentWinnerConnection: Nullable<DestinationConnection>;
}) {
  const { originConnections, brackets } = useBracket();

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
      onGameResultClick={() => {}}
      onGameClick={onGameClick}
      backgroundGameIds={backgroundGameIds}
      tournamentId={tournamentId}
    ></Brackets>
  );
}
