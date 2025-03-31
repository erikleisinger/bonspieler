import { useRef, useEffect, useState } from "react";
import { TournamentStageType } from "@/entities/Tournament";
import TournamentStageSidebar2 from "./TournamentStageSidebar2";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import EditBracketStageView from "./EditBracketStageView";
import ViewBracketStageView from "./ViewBracketStageView";
import { LoadBracket } from "@/widgets/Bracket/BracketEditor";
import { cn } from "@/lib/utils";
import { useSaveBracket } from "../lib";
import useTournamentStageViewerState from "../lib/useTournamentStageViewerState";
import { Button } from "@/shared/ui/button";
import { FaBan, FaCheck, FaEdit, FaPencilAlt } from "react-icons/fa";
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

  const scroller = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function onScroll(e) {
      setScrolled(e.target.scrollLeft > 50);
    }
    if (scroller?.current)
      scroller.current.addEventListener("scroll", onScroll);
    return () => {
      if (scroller?.current)
        scroller.current.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <div
      className="absolute inset-0  grid grid-rows-[auto_1fr] "
      ref={scroller}
    >
      <div className={cn("z-50   w-full")}>
        {tournamentId && (
          <TournamentStageSidebar2
            tournamentId={tournamentId}
            selectedStage={selectedStage}
            onSelectStage={selectStage}
            onSelectEditedStage={!editedStage?.id ? editStage : null}
            editedStageId={editedStage?.id || null}
            disabled={!!editedStage}
            onSave={onSaveStage}
            onCancel={resetState}
            dense={scrolled}
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
    </div>
  );
}
