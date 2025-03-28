import TournamentStageSidebar from "./TournamentStageSidebar";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import ViewBracketStageView from "./ViewBracketStageView";
import { cn } from "@/lib/utils";
import useTournamentStageViewerState from "../lib/useTournamentStageViewerState";
export default function EditTournamentStagesView({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const { selectStage, selectedStage, whatToShow } =
    useTournamentStageViewerState({
      editable: true,
    });
  return (
    <div className="absolute inset-0 overflow-auto flex">
      <div className={cn("z-50 sticky top-0 left-0")}>
        <TournamentStageSidebar
          tournamentId={tournamentId}
          selectedStage={selectedStage}
          onSelectStage={selectStage}
        />
      </div>

      {selectedStage?.id && (
        <TournamentStageContextProvider
          stage={selectedStage}
          tournamentId={tournamentId}
        >
          {whatToShow === "view" && (
            <ViewBracketStageView
              tournamentId={tournamentId}
              stageId={selectedStage.id}
            />
          )}
        </TournamentStageContextProvider>
      )}
    </div>
  );
}
