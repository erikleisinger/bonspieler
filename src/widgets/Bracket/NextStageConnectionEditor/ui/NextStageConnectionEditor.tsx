import { useState } from "react";
import { BracketGameType } from "@/entities/Bracket";
import { getWinnerConnectionsForGame } from "@/entities/Bracket/BracketGameConnections";
import { useAppSelector } from "@/lib/store";
import { TournamentStageSelectionList } from "@/features/Tournament/TournamentStageList";
import { useGetTournamentStagesQuery } from "@/shared/api";
import { TournamentStage } from "@/entities/Tournament";
import { updateWinnerConnectionForGame } from "@/entities/Bracket/BracketGameConnections";
import { useAppDispatch } from "@/lib/store";
import BracketProvider from "@/shared/Bracket/BracketProvider";
import NextStageConnectionViewer from "./NextStageConnectionViewer";
export default function NextStageConnectionEditor({
  game,
  stageId,
  tournamentId,
}: {
  game: BracketGameType;
  stageId: string;
  tournamentId: string;
}) {
  const { data: stages } = useGetTournamentStagesQuery(tournamentId, {
    skip: !tournamentId,
    refetchOnMountOrArgChange: true,
  });

  const winnerConnections = useAppSelector((state) =>
    getWinnerConnectionsForGame(state, game?.id)
  );

  const [selectedStageId, setSelectedStageId] = useState<string | null>(
    winnerConnections?.stageId || null
  );

  function onSelectStage(stage: TournamentStage) {
    const { id } = stage;
    setSelectedStageId(id);
  }

  const dispatch = useAppDispatch();

  function onSelectGame(gameToConnect: BracketGameType) {
    dispatch(
      updateWinnerConnectionForGame({
        gameId: game.id,
        newWinnerConnection: {
          stageId: selectedStageId,
          gameId: gameToConnect.id,
        },
      })
    );
  }

  if (!selectedStageId)
    return (
      <div className="p-6">
        {stages?.length && (
          <TournamentStageSelectionList
            stages={stages.filter(({ id }) => id !== stageId)}
            onSelectStage={onSelectStage}
          />
        )}
      </div>
    );
  return (
    <BracketProvider stageId={selectedStageId}>
      <NextStageConnectionViewer
        stageId={selectedStageId}
        tournamentId={tournamentId}
        onGameClick={onSelectGame}
        currentWinnerConnection={winnerConnections}
        viewingGameId={game.id}
        currentStageId={stageId}
      />
    </BracketProvider>
  );
}
