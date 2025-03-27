import "./stage-selection.scss";
import type { TournamentStage } from "@/entities/Tournament";
import { cn } from "@/lib/utils";
import Typography from "@/shared/ui/typography";
export default function TournamentStageSelectionList({
  stages,
  selectedStage,
  onSelectStage,
}: {
  stages: TournamentStage[];
  selectedStage: TournamentStage | null;
  onSelectStage: (stage: TournamentStage) => void;
}) {
  const selectedStageIndex = stages.findIndex(
    (stage) => stage.id === selectedStage?.id
  );
  return (
    <div className="relative w-[250px] h-[60px] group">
      <div className="absolute inset-0">
        <div
          className="flex stage-selection__option--container transition-all"
          style={{
            "--selected-index": selectedStageIndex,
          }}
        >
          {stages.map((stage, stageIndex) => (
            <div
              key={stage.id}
              onClick={() => onSelectStage(stage)}
              className={cn(
                " relative  stage-selection__option  cursor-pointer transition-all",
                selectedStage?.id === stage.id && "selected ",

                selectedStageIndex > stageIndex && "is-left",
                selectedStageIndex < stageIndex && "is-right"
              )}
              style={{
                "--actual-index": stageIndex,
              }}
            >
              <div
                className={cn(
                  "aspect-square skew-x-[-10deg] p-2  bg-white/70 backdrop-blur-sm hover:border-l-4 shadow-sm border-l-4 transition-all",
                  selectedStage?.id === stage.id &&
                    "border-l-4 border-l-primary shadow-lg bg-white text-indigo-500",
                  selectedStage?.id !== stage.id &&
                    "opacity-60 group-hover:opacity-100 hover:bg-white hover:border-l-primary"
                )}
              >
                <div
                  className={cn(
                    "stage-selection__option--content skew-x-[10deg] ",
                    selectedStage?.id !== stage.id &&
                      "opacity-10 group-hover:opacity-100"
                  )}
                >
                  <Typography tag="h2" className="text-[2.5rem]">
                    {stage.order.toString().padStart(2, "0")}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
