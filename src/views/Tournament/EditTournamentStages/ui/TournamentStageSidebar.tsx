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
export default function TournamentStageSidebar({
  tournamentId,
  editedStageId,
  selectedStage,
  onCancel = () => {},
  onSave = () => {},
  onSelectEditedStage,
  onSelectStage,
}: {
  tournamentId: string;
  editedStageId: Nullable<string>;
  selectedStage: TournamentStage;
  onSelectEditedStage: (stage: TournamentStage) => void;
  onSelectStage: (stage: TournamentStage) => void;
  onCancel: () => void;
  onSave: () => void;
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
        <TournamentStageListItemContainer className="translate-x-[-110px]" blur>
          <div className="p-4 py-4 relative pointer-events-auto h-full overflow-auto">
            <div>
              {stages?.length && (
                <TournamentStageSelectionList
                  stages={stages}
                  selectedStage={selectedStage}
                  onEditStage={onSelectEditedStage}
                  onSelectStage={onSelectStage}
                  expanded={!selectedStage}
                  collapse={!!selectedStage}
                  editedStageId={editedStageId}
                  saveChildren={
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <Button variant="secondary" onClick={onCancel}>
                        Cancel
                      </Button>
                      <SaveButton onClick={async () => onSave()}>
                        Save
                      </SaveButton>
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
