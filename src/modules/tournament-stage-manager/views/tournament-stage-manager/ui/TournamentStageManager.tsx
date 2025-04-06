import { useEffect, useRef, useState } from "react";
import { BracketContext, BracketViewer } from "@/modules/bracket-manager";
import { useGetTournamentStagesQuery } from "@/shared/api";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { useConnectionEditing } from "@/modules/tournament-stage-manager/hooks";
import {
  TournamentStageWizardModal,
  type GeneratedBracketStage,
  type GeneratedStage,
} from "@/modules/tournament-stage-wizard";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch } from "@/lib/store";
import {
  initBracketEvent,
  setBracketStageInfo,
  setConnections,
  setBrackets,
} from "@/modules/bracket-manager/shared/store";
import { TournamentStageType } from "@/entities/Tournament";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import TournamentConnections from "./TournamentConnections";
export default function TournamentStageManager({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const {
    data: stages,
    isSuccess: isFetchSuccess,
    isFetching: isFetchingStages,
  } = useGetTournamentStagesQuery({ tournamentId });

  const fetched = useRef(false);

  const [editedStageIds, setEditedStageIds] = useState<string[]>([]);

  useEffect(() => {
    if (isFetchSuccess && !isFetchingStages && !fetched.current) {
      fetched.current = true;
      setEditedStageIds([...(stages || [])].map((stage) => stage.id));
    }
  }, [stages, isFetchSuccess, isFetchingStages]);

  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  const { isEditing, toggleEditing, onGameClick } = useConnectionEditing();

  function onStageClick(stageId: string) {
    if (isEditing) return;
    if (!!selectedStageId) return;
    setSelectedStageId(stageId);
  }

  const [showWizard, setShowWizard] = useState(false);

  const dispatch = useAppDispatch();

  function addBracketStage(stage: GeneratedBracketStage) {
    dispatch(initBracketEvent({ stageId: stage.id }));
    const { id: stageId, name, type } = stage;
    dispatch(setBracketStageInfo({ stageId, name, type, tournamentId }));

    const { connections } = stage;
    dispatch(setConnections({ stageId, ...connections }));

    const { brackets } = stage;
    dispatch(
      setBrackets({
        stageId,
        brackets,
      })
    );
    setShowWizard(false);
    setEditedStageIds((prev) => [...prev, stageId]);
  }

  function generateNewStage(stage: GeneratedStage) {
    const { type } = stage;
    if (type === TournamentStageType.Bracket) {
      addBracketStage(stage);
    }
  }

  return (
    <div className="absolute inset-0 grid grid-rows-[auto_1fr]">
      <TournamentStageWizardModal
        open={showWizard}
        setOpen={setShowWizard}
        onGenerate={generateNewStage}
      />
      {selectedStageId ? (
        <div />
      ) : (
        <div className="flex gap-4 p-4">
          <Button onClick={() => setShowWizard(true)}>
            <FaPlus /> Add Stage
          </Button>
          <div className="flex gap-1 items-center">
            <Checkbox
              checked={isEditing}
              onCheckedChange={toggleEditing}
              id="tournament-stage-editor-connection-checkbox"
            ></Checkbox>
            <Label htmlFor="tournament-stage-editor-connection-checkbox">
              Show connections
            </Label>
          </div>
        </div>
      )}
      <div className="relative">
        {isEditing && <TournamentConnections />}
        <div className="absolute inset-0 overflow-auto">
          <div
            className={cn("grid  gap-4 h-fit")}
            style={{
              gridTemplateColumns: `repeat(${editedStageIds.length}, auto)`,
            }}
          >
            {editedStageIds?.length &&
              editedStageIds.map((stageId) => {
                return (
                  <div
                    key={stageId}
                    className={cn(
                      "flex flex-col justify-center rounded-xl   overflow-hidden",
                      !isEditing && "cursor-pointer  hover:bg-indigo-300/20"
                    )}
                  >
                    <div
                      className={cn(
                        "relative   ",
                        selectedStageId &&
                          selectedStageId !== stageId &&
                          "hidden",
                        !selectedStageId
                          ? "min-w-[300px]   flex flex-col justify-center"
                          : "absolute inset-0"
                      )}
                      onClick={() => onStageClick(stageId)}
                    >
                      <BracketContext key={stageId} stageId={stageId}>
                        <BracketViewer
                          editing={stageId === selectedStageId}
                          size={
                            stageId === selectedStageId ? "full" : "minimal"
                          }
                          showTitle={!!selectedStageId}
                          mode={!selectedStageId && "connections"}
                          className={
                            selectedStageId
                              ? " rounded-xl overflow-hidden bg-transparent"
                              : "relative bg-transparent"
                          }
                          bracketClass={
                            selectedStageId ? "" : "relative bg-transparent"
                          }
                          onBack={() => setSelectedStageId(null)}
                          providedOnGameClick={onGameClick}
                        />
                      </BracketContext>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
