import { useState } from "react";
import {
  TournamentStageType,
  type TournamentStage,
} from "@/entities/Tournament";
import TournamentStageSidebar from "./TournamentStageSidebar";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import EditBracketStageView from "./EditBracketStageView";
import ViewBracketStageView from "./ViewBracketStageView";
import { LoadBracket } from "@/widgets/Bracket/BracketEditor";
import { cn } from "@/lib/utils";
import { useSaveBracket } from "../lib";
import useTournamentStageViewerState from "../lib/useTournamentStageViewerState";
export default function EditTournamentStagesView({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const {
    selectStage,
    selectedStage,
    editStage,
    canEdit,
    editedStage,
    resetState,
    whatToShow,
  } = useTournamentStageViewerState({
    editable: true,
  });
  const { save: saveBracket } = useSaveBracket();
  async function onSaveStage() {
    if (!editedStage) return;
    if (editedStage.type === TournamentStageType.Bracket) {
      await saveBracket();
    }
    resetState();
  }
  return (
    <div className="absolute inset-0 overflow-auto flex">
      <div className={cn("z-50 sticky top-0 left-0")}>
        <TournamentStageSidebar
          tournamentId={tournamentId}
          selectedStage={selectedStage}
          onSelectStage={selectStage}
          onSelectEditedStage={!editedStage?.id ? editStage : null}
          editedStageId={editedStage?.id || null}
          disabled={!!editedStage}
          onSave={onSaveStage}
          onCancel={resetState}
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

          {editedStage?.id &&
            editedStage.type === TournamentStageType.Bracket && (
              <LoadBracket stageId={editedStage.id}>
                {whatToShow === "edit" && (
                  <EditBracketStageView
                    tournamentId={tournamentId}
                    stageId={editedStage.id}
                    onSave={onSaveStage}
                  />
                )}
              </LoadBracket>
            )}
        </TournamentStageContextProvider>
      )}
    </div>
  );
}
