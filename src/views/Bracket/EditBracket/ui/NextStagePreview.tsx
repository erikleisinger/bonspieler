import {
  useGetTournamentStagesQuery,
  useGetBracketGamesQuery,
  useGetBracketConnectionsQuery,
} from "@/shared/api";

import { BracketGame } from "@/entities/Bracket";
import { useMemo } from "react";
import {
  generateReadableIdIndex,
  generateGameIndex,
} from "@/entities/Bracket/BracketGame";
import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
export default function NextStagePreview({
  closePreview,
  stageOrder,
  tournamentId,
}: {
  closePreview: () => void;
  stageOrder: number;
  tournamentId: string;
}) {
  const { data: stages } = useGetTournamentStagesQuery(tournamentId);
  const stage = stages?.find((s) => s.order === stageOrder);
  const stageId = stage?.id;

  const { data: nextStageConnections } = useGetBracketConnectionsQuery(
    stageId,
    {
      refetchOnMountOrArgChange: true,
      skip: !stageId,
    }
  );

  const { data: nextStageBracketData } = useGetBracketGamesQuery(stageId, {
    refetchOnMountOrArgChange: true,
    skip: !stageId,
  });

  const originConnections = useMemo(() => {
    return nextStageConnections?.originConnections || {};
  }, [nextStageConnections]);

  const winnerConnections = useMemo(() => {
    return nextStageConnections?.winnerConnections || {};
  }, [nextStageConnections]);

  const loserConnections = useMemo(() => {
    return nextStageConnections?.loserConnections || {};
  }, [nextStageConnections]);

  const { readableIdIndex, gameIndex } = useMemo(() => {
    const { brackets = [] } = nextStageBracketData || {};
    return {
      readableIdIndex: generateReadableIdIndex(brackets),
      gameIndex: generateGameIndex(brackets),
    };
  }, [nextStageBracketData]);

  const { availableGameIds, backgroundGameIds } = useMemo(() => {
    const { brackets = [[[]]] } = nextStageBracketData || {};
    return {
      backgroundGameIds: brackets
        .flat()
        .flat()
        .filter(
          ({ id }) =>
            originConnections[id]?.length &&
            originConnections[id].every(({ gameId }) => !gameId)
        )
        .map(({ id }) => id),
      availableGameIds: brackets
        .flat()
        .flat()
        .filter(
          ({ id }) =>
            !originConnections[id]?.length ||
            originConnections[id].length < 2 ||
            originConnections[id].some(({ gameId }) => !gameId)
        )
        .map(({ id }) => id),
    };
  }, [nextStageBracketData, originConnections]);
  return (
    <div className="flex flex-col gap-8">
      {nextStageBracketData?.brackets?.length && (
        <BracketViewer
          schedule={nextStageBracketData.schedule}
          winnerConnections={winnerConnections}
          loserConnections={loserConnections}
          readableIdIndex={readableIdIndex}
          brackets={nextStageBracketData.brackets}
          originConnections={originConnections}
          onGameClick={() => {}}
          onGameResultClick={() => {}}
          availableGameIds={[]}
          backgroundGameIds={backgroundGameIds}
          availableGameIds={availableGameIds}
          onBackgroundClick={closePreview}
        />
      )}
    </div>
  );
}
