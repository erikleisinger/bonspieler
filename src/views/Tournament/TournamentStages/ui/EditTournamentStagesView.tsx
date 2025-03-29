import { useRef, useEffect, useState } from "react";
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
    <div className="absolute inset-0 overflow-auto flex" ref={scroller}>
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
          dense={scrolled}
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
