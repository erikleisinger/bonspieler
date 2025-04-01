import { TournamentStageType } from "@/entities/Tournament";
import { TournamentStageSelect } from "@/features/Tournament/TournamentStageSelect";
import EditBracketStageView from "./EditBracketStageView";
import ViewBracketStageView from "../view/ViewBracketStageView";
import { LoadBracket } from "@/widgets/Bracket/BracketEditor";
import { cn } from "@/lib/utils";
import { useSaveBracket } from "../../lib";
import useTournamentStageViewerState from "../../lib/useTournamentStageViewerState";
import { Button } from "@/shared/ui/button";
import { FaBan, FaCheck, FaPencilAlt } from "react-icons/fa";
import useEditedStage from "../../lib/useEditedStage";
import { AddTournamentStageButton } from "@/features/Tournament/AddTournamentStage";
import { useGetTournamentStagesQuery } from "@/shared/api";
import { useRemoveTournamentStageMutation } from "@/shared/api";
export default function EditTournamentStagesView({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const { data: stages } = useGetTournamentStagesQuery(
    { tournamentId },
    {
      skip: !tournamentId,
    }
  );

  const {
    selectStage,
    selectedStage,
    editStage,
    editedStage: currentEditedStage,
    resetState,
    whatToShow,
  } = useTournamentStageViewerState({
    editable: true,
  });

  const [removeStage] = useRemoveTournamentStageMutation();

  function handleRemoveStage(stageId: string) {
    removeStage(stageId);
    resetState();
  }

  const editedStage = useEditedStage({ stage: currentEditedStage });
  const { save: saveBracket } = useSaveBracket();
  async function onSaveStage() {
    if (!editedStage) return;
    if (editedStage.type === TournamentStageType.Bracket) {
      await saveBracket();
    }
    resetState();
  }

  return (
    <div className="absolute inset-0  grid grid-rows-[auto_1fr] ">
      <div className={cn("z-50   w-full")}>
        {tournamentId && (
          <div className="flex">
            <TournamentStageSelect
              stages={stages || []}
              selectedStage={selectedStage}
              onSelectStage={selectStage}
              editedStage={editedStage}
              editChildren={
                !editedStage?.id ? (
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        editStage(selectedStage);
                      }}
                    >
                      <FaPencilAlt />
                    </Button>
                  </div>
                ) : editedStage?.id === selectedStage?.id ? (
                  <div className="flex gap-2 items-center">
                    <Button variant="ghost" size="icon" onClick={resetState}>
                      <FaBan />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onSaveStage}>
                      <FaCheck />
                    </Button>
                  </div>
                ) : (
                  <div />
                )
              }
            />
            <AddTournamentStageButton
              tournamentId={tournamentId}
              numStages={stages?.length || 0}
            />
          </div>
        )}
      </div>
      <div
        className={cn(
          "relative flex  border-l-8 border-t-8 rounded-tl-xl ",
          selectedStage?.id === editedStage?.id
            ? "border-emerald-500"
            : !!selectedStage?.id
            ? "border-primary"
            : "border-transparent"
        )}
      >
        {selectedStage?.id && (
          <>
            {whatToShow === "view" &&
              selectedStage.type === TournamentStageType.Bracket && (
                <ViewBracketStageView
                  tournamentId={tournamentId}
                  stageId={selectedStage.id}
                />
              )}

            {currentEditedStage?.id &&
              currentEditedStage.type === TournamentStageType.Bracket && (
                <LoadBracket stageId={currentEditedStage?.id}>
                  {whatToShow === "edit" && (
                    <EditBracketStageView
                      tournamentId={tournamentId}
                      stageId={currentEditedStage?.id}
                      onSave={onSaveStage}
                      onRemoveStage={handleRemoveStage}
                    />
                  )}
                </LoadBracket>
              )}
          </>
        )}
      </div>
    </div>
  );
}
