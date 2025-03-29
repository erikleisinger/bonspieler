import { useEffect, useState } from "react";
import { TournamentStage } from "@/entities/Tournament";
import { useGetTournamentStagesQuery } from "@/shared/api";
import {
  TournamentStageListItemContainer,
  TournamentStageSelectionList,
} from "@/features/Tournament/TournamentStageList";
import { Button } from "@/shared/ui/button";
import { Nullable } from "@/shared/types";
import SaveButton from "@/shared/ui/save-button";
import { FaBan, FaSave } from "react-icons/fa";
import { cn } from "@/lib/utils";
export default function TournamentStageSidebar({
  dense,
  tournamentId,
  editedStageId,
  selectedStage,
  onCancel = () => {},
  onSave = () => {},
  onSelectEditedStage,
  onSelectStage,
}: {
  dense?: boolean;
  tournamentId: string;
  editedStageId?: Nullable<string>;
  selectedStage: TournamentStage;
  onSelectEditedStage?: (stage: TournamentStage) => void;
  onSelectStage: (stage: TournamentStage) => void;
  onCancel?: () => void;
  onSave?: () => void;
}) {
  const { data: stages } = useGetTournamentStagesQuery(tournamentId, {
    refetchOnMountOrArgChange: true,
    skip: !tournamentId,
  });

  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    if (initialLoadDone) return;
    if (stages) {
      setInitialLoadDone(true);
      onSelectStage(stages[0]);
    }
  }, [stages]);

  return (
    <div className="h-full relative z-50 pointer-events-none w-[300px]">
      <div className="absolute pointer-events-none inset-0">
        <TournamentStageListItemContainer
          className="translate-x-[-110px]"
          blur={!dense}
          animated={false}
          showBorder={!dense}
        >
          <div className="p-4 py-4 relative pointer-events-auto h-full overflow-auto">
            <div>
              {stages?.length && selectedStage && (
                <TournamentStageSelectionList
                  stages={stages}
                  selectedStage={selectedStage}
                  onEditStage={onSelectEditedStage}
                  onSelectStage={onSelectStage}
                  expanded={!selectedStage}
                  collapse={!!selectedStage}
                  editedStageId={editedStageId}
                  dense={dense}
                  saveChildren={
                    <div
                      className={cn(
                        dense
                          ? "flex gap-2 px-4 -mt-4"
                          : "p-4 grid grid-cols-2 gap-2"
                      )}
                    >
                      <Button
                        variant={dense ? "ghost" : "secondary"}
                        size={dense ? "icon" : "default"}
                        onClick={onCancel}
                      >
                        {dense ? <FaBan /> : <div>Cancel</div>}
                      </Button>
                      {dense ? (
                        <Button size="icon" variant="default">
                          <FaSave />
                        </Button>
                      ) : (
                        <SaveButton
                          size={dense ? "icon" : "default"}
                          onClick={async () => onSave()}
                        />
                      )}
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </TournamentStageListItemContainer>
      </div>
    </div>
  );
}
