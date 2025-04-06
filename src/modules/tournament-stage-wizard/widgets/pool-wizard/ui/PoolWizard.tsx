import { TabsContent } from "@/shared/ui/tabs";
import {
  StageWizardTab,
  EditedPoolStage,
} from "@/modules/tournament-stage-wizard/shared/types";
import { SelectPoolFormat } from "@/modules/tournament-stage-wizard/features/select-pool-format";

import NumberInput from "@/shared/ui/number-input";
import { PoolFormat } from "@/modules/tournament-stage-wizard/shared/types";
import { Label } from "@/shared/ui/label";
import { SelectNumPools } from "@/modules/tournament-stage-wizard/features/select-num-pools";
import { SelectWinnersPerPool } from "@/modules/tournament-stage-wizard/features/select-winners-per-pool";
export default function PoolWizard({
  editedStage,
  setEditedStage,
  goNext,
}: {
  editedStage: EditedPoolStage;
  setEditedStage: (updates: Partial<EditedPoolStage>) => void;
  goNext: () => void;
}) {
  function updateNumGamesPerTeam(numGamesPerTeam: number) {
    setEditedStage({ numGamesPerTeam });
  }

  function updatePoolFormat(newFormat: PoolFormat) {
    setEditedStage({ format: newFormat });
    if (newFormat === "RoundRobin") {
      updateNumGamesPerTeam(editedStage.numTeams - 1);
    } else {
      updateNumGamesPerTeam(3);
    }
  }

  function updateNumPools(numPools: number) {
    setEditedStage({ numPools });
  }

  function updateWinnersPerPool(newWinnersPerPool: number[]) {
    setEditedStage({ winnersPerPool: newWinnersPerPool });
  }

  return (
    <>
      <TabsContent value={StageWizardTab.SelectPoolFormat}>
        <SelectPoolFormat
          selection={editedStage.format}
          setSelection={updatePoolFormat}
        />
      </TabsContent>
      <TabsContent value={StageWizardTab.SelectPoolOptions}>
        {editedStage.format !== "RoundRobin" && (
          <div className="flex  gap-2 items-center">
            <div className="grow">
              <Label
                htmlFor="POOL_WIZARD_NUM_GAMES_PER_TEAM"
                className="whitespace-nowrap"
              >
                Number of games per team
              </Label>
            </div>

            <NumberInput
              id="POOL_WIZARD_NUM_GAMES_PER_TEAM"
              hideButtons={true}
              min={1}
              number={editedStage.numGamesPerTeam}
              setNumber={updateNumGamesPerTeam}
            />
          </div>
        )}

        <SelectNumPools
          numPools={editedStage.numPools}
          setNumPools={updateNumPools}
        />
        <SelectWinnersPerPool
          numPools={editedStage.numPools}
          winnersPerPool={editedStage.winnersPerPool}
          setWinnersPerPool={updateWinnersPerPool}
        />
      </TabsContent>
    </>
  );
}
