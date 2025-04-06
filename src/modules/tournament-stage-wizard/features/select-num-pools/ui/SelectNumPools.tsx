import { TournamentStageType } from "@/entities/Tournament";
import { cn } from "@/lib/utils";
import { Nullable } from "@/shared/types";
import { StageTypeIcon } from "@/shared/ui/Stage";
import { useState } from "react";
import { Label } from "@/shared/ui/label";

export default function SelectNumPools({
  numPools,
  setNumPools,
}: {
  numPools: number;
  setNumPools: (numPools: number) => void;
}) {
  const [hovered, setHovered] = useState<Nullable<number>>(null);
  const tempValue = hovered === null ? numPools : hovered + 1;
  return (
    <div className="mt-4 flex flex-col gap-4">
      <Label>
        {tempValue} {tempValue > 1 ? "pools" : "pool"}
      </Label>
      <div
        className="flex flex-wrap  justify-start"
        onMouseLeave={() => setHovered(null)}
      >
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <div
              className="p-1 "
              key={"select-num-pools-" + i}
              onMouseOver={() => setHovered(i)}
            >
              <div
                className={cn(
                  "flex flex-col items-center w-[100px] h-[100px] shadow-md rounded-lg justify-center cursor-pointer transition-all",
                  numPools >= i + 1
                    ? "bg-primary text-primary-foreground"
                    : hovered !== null && hovered >= i
                    ? "bg-primary-muted text-primary-foreground"
                    : "hover:bg-primary-muted hover:text-primary-foreground "
                )}
                onClick={() => setNumPools(i + 1)}
              >
                <StageTypeIcon
                  type={TournamentStageType.Pool}
                  className="text-[3rem]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
