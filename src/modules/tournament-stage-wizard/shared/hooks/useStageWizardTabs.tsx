import { TournamentStageType } from "@/entities/Tournament";
import { StageWizardTab } from "@/modules/tournament-stage-wizard/shared/types";
import { Nullable } from "@/shared/types";
import { useMemo } from "react";
export function useStageWizardTabs({
  type,
}: {
  type: Nullable<TournamentStageType>;
}) {
  const tabs = useMemo(() => {
    const base = [
      {
        title: "Stage Type",
        value: StageWizardTab.SelectStageType,
      },
    ];
    if (!type) return base;
    if (type === TournamentStageType.Bracket) {
      return [
        ...base,
        {
          title: "Bracket Format",
          value: StageWizardTab.SelectBracketFormat,
        },
        {
          title: "Win System",
          value: StageWizardTab.SelectStageWinnerFormat,
        },
        {
          title: "Winners",
          value: StageWizardTab.SelectBracketWinners,
        },
      ];
    } else if (type === TournamentStageType.Pool) {
      return [
        ...base,

        {
          title: "Pool Format",
          value: StageWizardTab.SelectPoolFormat,
        },
        {
          title: "Win System",
          value: StageWizardTab.SelectStageWinnerFormat,
        },
        {
          title: "Options",
          value: StageWizardTab.SelectPoolOptions,
        },
      ];
    }
    return [];
  }, [type]);

  return tabs;
}
