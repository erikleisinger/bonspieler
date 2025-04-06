import { useMemo } from "react";
import { StageWizardTab } from "../types";
import { TournamentStageType } from "@/entities/Tournament";
import { Nullable } from "@/shared/types";

export default function useStageWizardNavigation({
  activeTab,
  setActiveTab,
  stageType,
}: {
  activeTab: StageWizardTab;
  setActiveTab: (tab: StageWizardTab) => void;
  stageType: Nullable<TournamentStageType>;
}) {
  const goNext = useMemo(() => {
    if (!stageType) return null;
    if (stageType === TournamentStageType.Bracket) {
      if (activeTab === StageWizardTab.SelectStageType) {
        return () => setActiveTab(StageWizardTab.SelectBracketFormat);
      } else if (activeTab === StageWizardTab.SelectBracketFormat) {
        return () => setActiveTab(StageWizardTab.SelectBracketWinners);
      }
    }
  }, [activeTab, setActiveTab, stageType]);

  const goBack = useMemo(() => {
    if (!stageType) {
      return null;
    }
    if (activeTab === StageWizardTab.SelectStageType) {
      return null;
    }

    if (stageType === TournamentStageType.Bracket) {
      if (activeTab === StageWizardTab.SelectBracketFormat) {
        return () => setActiveTab(StageWizardTab.SelectStageType);
      } else if (activeTab === StageWizardTab.SelectBracketWinners) {
        return () => setActiveTab(StageWizardTab.SelectBracketFormat);
      }
    }
  }, [activeTab, setActiveTab, stageType]);

  const isLast = useMemo(() => {
    if (stageType === TournamentStageType.Bracket) {
      return activeTab === StageWizardTab.SelectBracketWinners;
    }
  }, [activeTab, stageType]);

  return {
    goNext,
    goBack,
    isLast,
  };
}
