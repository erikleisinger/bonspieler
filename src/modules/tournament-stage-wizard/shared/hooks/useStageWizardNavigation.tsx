import { useMemo } from "react";
import { StageWizardTab } from "../types";
import { TournamentStageType } from "@/entities/Tournament";

import { Nullable } from "@/shared/types";
import { useStageWizardTabs } from "./useStageWizardTabs";
export function useStageWizardNavigation({
  activeTab,
  setActiveTab,
  stageType,
}: {
  activeTab: StageWizardTab;
  setActiveTab: (tab: StageWizardTab) => void;
  stageType: Nullable<TournamentStageType>;
}) {
  const tabs = useStageWizardTabs({ type: stageType });
  const goNext = useMemo(() => {
    if (!stageType) return;
    const thisTabIndex = tabs.findIndex((tab) => tab.value === activeTab);
    if (thisTabIndex === -1) {
      return;
    }
    const nextTabIndex = thisTabIndex + 1;
    if (nextTabIndex >= tabs?.length) return;
    return () => setActiveTab(tabs[nextTabIndex].value);
  }, [activeTab, setActiveTab, stageType, tabs]);

  const goBack = useMemo(() => {
    if (!stageType) {
      return;
    }
    const thisTabIndex = tabs.findIndex((tab) => tab.value === activeTab);
    if (thisTabIndex === -1) {
      return;
    }
    const nextTabIndex = thisTabIndex - 1;
    if (nextTabIndex < 0) return;
    return () => setActiveTab(tabs[nextTabIndex].value);
  }, [activeTab, setActiveTab, stageType, tabs]);

  const isLast = useMemo(() => {
    if (!stageType) {
      return false;
    }
    const thisTabIndex = tabs.findIndex((tab) => tab.value === activeTab);
    if (thisTabIndex === -1) {
      return false;
    }
    return thisTabIndex === tabs.length - 1;
  }, [activeTab, stageType, tabs]);

  const generateStage = isLast ? () => {} : undefined;

  return {
    goNext,
    goBack,
    generateStage,
  };
}
