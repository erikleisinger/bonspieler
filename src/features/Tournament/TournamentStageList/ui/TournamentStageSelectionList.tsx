import type { TournamentStage } from "@/entities/Tournament";
import { cn } from "@/lib/utils";
import TournamentStageListItemContent from "./TournamentStageListItemContent";
import { Button } from "@/shared/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { Nullable } from "@/shared/types";
import Typography from "@/shared/ui/typography";
export default function TournamentStageSelectionList({
  dense,
  stages,
  selectedStage,
  onEditStage,
  onSelectStage,
  editedStageId,
  saveChildren,
}: {
  dense?: boolean;
  stages: TournamentStage[];
  selectedStage: TournamentStage | null;
  onEditStage?: (stage: TournamentStage) => void;
  onSelectStage: (stage: TournamentStage) => void;
  editedStageId?: Nullable<string>;
  saveChildren?: React.ReactNode;
}) {
  function isStageSelected(stageId: string) {
    return selectedStage?.id === stageId;
  }

  function handleEditStage(e: React.MouseEvent, stage: TournamentStage) {
    e.stopPropagation();
    if (onEditStage) onEditStage(stage);
  }

  return (
    <div className={cn("flex flex-col ", !selectedStage && "gap-4 ")}>
      {stages.map((stage, i) => {
        return (
          <div
            key={stage.id}
            style={{
              order: editedStageId === stage.id ? 0 : i + 1,
            }}
            onClick={() => onSelectStage(stage)}
            className={cn(
              isStageSelected(stage.id) &&
                (!editedStageId || editedStageId === stage.id) &&
                "border-l-4 border-primary ",
              !isStageSelected(stage?.id) &&
                editedStageId === stage.id &&
                "border-l-4 border-primary my-1 pl-4"
            )}
          >
            {editedStageId === stage.id && (
              <Typography
                tag="overline"
                className={cn(
                  "flex gap-2",
                  isStageSelected(stage.id) ? "pl-4 pt-4 " : "pl-2"
                )}
              >
                <FaPencilAlt />
                Editing
              </Typography>
            )}
            <TournamentStageListItemContent
              numberChildren={
                !!onEditStage &&
                isStageSelected(stage.id) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleEditStage(e, stage)}
                  >
                    <FaPencilAlt />
                  </Button>
                )
              }
              dense={dense || (selectedStage && !isStageSelected(stage.id))}
              hideText={
                dense ||
                (editedStageId !== stage.id && !isStageSelected(stage.id))
              }
              className={cn(
                "p-0 cursor-pointer",
                selectedStage &&
                  !isStageSelected(stage.id) &&
                  editedStageId !== stage.id &&
                  "opacity-50 hover:opacity-100",
                isStageSelected(stage.id) && "pb-4 pt-2 pl-2",
                !selectedStage && "hover:bg-glass backdrop-blur-sm"
              )}
              stage={stage}
            />

            {editedStageId === stage.id &&
              isStageSelected(stage.id) &&
              saveChildren}
          </div>
        );
      })}
    </div>
  );
}
