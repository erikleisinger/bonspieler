import { StageWinnerFormat } from "@/modules/tournament-stage-wizard/shared/types";
import { useContext } from "react";
import {
  getStageCardStyle,
  StageWizardContext,
} from "@/modules/tournament-stage-wizard/shared/lib";
import { FormatCard } from "@/modules/tournament-stage-wizard/shared/ui";
import { cn } from "@/lib/utils";
import { Nullable } from "@/shared/types";
export default function SelectStageFormat({
  format,
  setFormat,
  className,
}: {
  format: Nullable<StageWinnerFormat>;
  setFormat: (format: StageWinnerFormat) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      <FormatCard
        title="Win/Loss"
        description="Results are based on wins and losses."
        selected={format === StageWinnerFormat.WinLoss}
        onClick={() => setFormat(StageWinnerFormat.WinLoss)}
      />
      <FormatCard
        title="Points"
        description="Teams accumulate points based on their performance."
        selected={format === StageWinnerFormat.Points}
        onClick={() => setFormat(StageWinnerFormat.Points)}
      />
    </div>
  );
}
