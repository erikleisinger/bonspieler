import { TabsContent } from "@/shared/ui/tabs";
import { StageWizardTab } from "../types";
import { SelectPoolFormat } from "@/modules/tournament-stage-manager/features/select-pool-format";
import { PoolTournamentStage } from "../types";
import NumberInput from "@/shared/ui/number-input";
export default function PoolWizard({
  editedStage,
  setEditedStage,
  setTab,
}: {
  editedStage: PoolTournamentStage;
  setEditedStage: (stage: PoolTournamentStage) => void;
  setTab: (tab: StageWizardTab) => void;
}) {
  function updateNumGamesPerTeam(numGamesPerTeam: number) {
    setEditedStage((prev) => ({
      ...prev,
      numGamesPerTeam,
    }));
  }

  return (
    <>
      <TabsContent value={StageWizardTab.SelectPoolFormat}>
        <SelectPoolFormat />
      </TabsContent>
      <TabsContent value={StageWizardTab.SelectPoolOptions}>
        <NumberInput
          number={editedStage.numGamesPerTeam}
          setNumber={updateNumGamesPerTeam}
        />
      </TabsContent>
    </>
  );
}
