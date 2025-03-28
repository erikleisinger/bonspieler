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
export default function EditTournamentStagesView({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const [selectedStage, setSelectedStage] = useState<TournamentStage>(null);
  const [editedStage, setEditedStage] = useState<TournamentStage>(null);

  const [viewingPriority, setViewingPriority] = useState("editing");

  function onSelectEditedStage(stage: TournamentStage) {
    setEditedStage(stage);
    setViewingPriority("editing");
  }

  function onSelectSelectedStage(stage: TournamentStage) {
    setSelectedStage(stage);
    if (stage.id === editedStage?.id) {
      setViewingPriority("editing");
    } else {
      setViewingPriority("viewing");
    }
  }

  function resetEditedStage() {
    setSelectedStage(editedStage);
    setEditedStage(null);
    setViewingPriority("viewing");
  }

  const { save: saveBracket } = useSaveBracket();
  async function onSaveStage() {
    if (!editedStage) return;
    if (editedStage.type === TournamentStageType.Bracket) {
      await saveBracket();
    }
    resetEditedStage();
  }
  return (
    <div className="absolute inset-0 overflow-auto flex">
      <div className={cn("z-50 sticky top-0 left-0")}>
        <TournamentStageSidebar
          tournamentId={tournamentId}
          selectedStage={selectedStage}
          onSelectStage={onSelectSelectedStage}
          onSelectEditedStage={editedStage ? null : onSelectEditedStage}
          editedStageId={editedStage?.id}
          disabled={!!editedStage}
          onSave={onSaveStage}
          onCancel={resetEditedStage}
        />
      </div>

      {selectedStage?.id && (
        <TournamentStageContextProvider
          stage={selectedStage}
          tournamentId={tournamentId}
        >
          {selectedStage &&
            selectedStage.type === TournamentStageType.Bracket &&
            viewingPriority === "viewing" && (
              <ViewBracketStageView
                tournamentId={tournamentId}
                stageId={selectedStage.id}
              />
            )}
          {editedStage?.id &&
            editedStage.type === TournamentStageType.Bracket && (
              <LoadBracket stageId={editedStage.id}>
                {viewingPriority === "editing" && (
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
