import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { TournamentStageType } from "@/entities/Tournament";
import { StageTypeIcon } from "@/shared/ui/Stage";
import { Button } from "@/shared/ui/button";
import { useAddTournamentStagesMutation } from "@/shared/api";
import { generateUUID } from "@/shared/utils/generateUUID";
export default function AddTournamentStageButton({
  tournamentId,
  numStages,
}: {
  tournamentId: string;
  numStages: number;
}) {
  const [addTournamentStages] = useAddTournamentStagesMutation();

  function addStage(stageType: TournamentStageType) {
    addTournamentStages({
      tournamentId,
      stages: [
        {
          id: generateUUID(),
          name: "New Stage",
          type: stageType,
          order: numStages || 0,
          tournament_id: tournamentId,
        },
      ],
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 group relative cursor-pointer">
          <div
            className={cn(
              "flex justify-center items-center skew-x-[-10deg] aspect-square transition-all bg-glass",
              isOpen
                ? "text-white bg-indigo-500"
                : "text-indigo-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
            )}
          >
            <div className="skew-x-[10deg]">
              <FaPlus />
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-fit">
        <div>
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => addStage(TournamentStageType.Bracket)}
          >
            <StageTypeIcon type={TournamentStageType.Bracket} />{" "}
            <div className="grow">Bracket</div>
          </Button>
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => addStage(TournamentStageType.Pool)}
          >
            <StageTypeIcon type={TournamentStageType.Pool} />{" "}
            <div className="grow">Pool</div>
          </Button>
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => addStage(TournamentStageType.Points)}
          >
            <StageTypeIcon type={TournamentStageType.Points} />{" "}
            <div className="grow">Points</div>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
