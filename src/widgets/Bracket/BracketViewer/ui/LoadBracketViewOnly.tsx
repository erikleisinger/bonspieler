import {
  useGetBracketGamesQuery,
  useGetBracketConnectionsQuery,
} from "@/shared/api";

import { useMemo } from "react";
import {
  generateReadableIdIndex,
  generateGameIndex,
} from "@/entities/Bracket/BracketGame";
import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import { BracketGameType } from "@/entities/Bracket";
import { useAppDispatch } from "@/lib/store";
import { setSelectedGame } from "@/widgets/Bracket/BracketViewer";
import LoaderFullPage from "@/shared/ui/loader-full-page";

export default function LoadBracketViewOnly({ stageId }: { stageId: string }) {
  const { data: connections } = useGetBracketConnectionsQuery(stageId, {
    refetchOnMountOrArgChange: true,
    skip: !stageId,
  });

  const { data: bracketData } = useGetBracketGamesQuery(stageId, {
    refetchOnMountOrArgChange: true,
    skip: !stageId,
  });

  const originConnections = useMemo(() => {
    return connections?.originConnections || {};
  }, [connections]);

  const winnerConnections = useMemo(() => {
    return connections?.winnerConnections || {};
  }, [connections]);

  const loserConnections = useMemo(() => {
    return connections?.loserConnections || {};
  }, [connections]);

  const { readableIdIndex } = useMemo(() => {
    const { brackets = [] } = bracketData || {};
    return {
      readableIdIndex: generateReadableIdIndex(brackets),
      gameIndex: generateGameIndex(brackets),
    };
  }, [bracketData]);

  const dispatch = useAppDispatch();

  function onGameClick(game: BracketGameType) {
    dispatch(setSelectedGame(game.id));
  }

  return bracketData?.brackets?.length ? (
    <BracketViewer
      schedule={bracketData.schedule}
      winnerConnections={winnerConnections}
      loserConnections={loserConnections}
      readableIdIndex={readableIdIndex}
      brackets={bracketData.brackets}
      originConnections={originConnections}
      onGameClick={onGameClick}
      onGameResultClick={() => {}}
      availableGameIds={[]}
      backgroundGameIds={[]}
      onBackgroundClick={() => dispatch(setSelectedGame(null))}
    />
  ) : (
    <div />
  );
}
