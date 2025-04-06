import { TabsContent } from "@radix-ui/react-tabs";
import { BracketTournamentStage, StageWizardTab } from "../types";
import { SelectBracketFormat } from "@/modules/tournament-stage-manager/features/select-bracket-format";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
export function BracketWizard({
  editedStage,
  setEditedStage,
  setTab,
}: {
  editedStage: BracketTournamentStage;
  setEditedStage: (stage: BracketTournamentStage) => void;
  setTab: (tab: StageWizardTab) => void;
}) {
  function updateNumWinners(numWinners: number) {
    setEditedStage((prev: BracketTournamentStage) => ({
      ...prev,
      numWinners,
    }));
  }

  function updateNumWinnersArray(newWinnerArray: number[]) {
    setEditedStage((prev: BracketTournamentStage) => ({
      ...prev,
      numWinnersArray: newWinnerArray,
    }));
  }

  function updateNumBrackets(newNumBrackets: number) {
    setEditedStage((prev: BracketTournamentStage) => ({
      ...prev,
      numBrackets: newNumBrackets,
      numWinnersArray: Array.from({ length: newNumBrackets }, () => 1),
      numWinners: newNumBrackets,
    }));
    setTab(StageWizardTab.SelectBracketWinners);
  }

  function handleUpdateNumWinnersArray(newWinnerCount: number, index: number) {
    const newWinners = [...editedStage.numWinnersArray];
    newWinners[index] = newWinnerCount;
    updateNumWinnersArray(newWinners);
    updateNumWinners(newWinners.reduce((a, c) => a + c, 0));
  }

  function redistributeWinners(newNumWinners: number) {
    const newNumWinnersArray = Array.from({
      length: editedStage.numBrackets,
    }).map(() => 0);
    let numWinnersToDistribute = newNumWinners;
    let currentIndex = 0;
    while (numWinnersToDistribute > 0) {
      newNumWinnersArray[currentIndex] += 1;
      numWinnersToDistribute -= 1;
      if (currentIndex === editedStage.numBrackets - 1) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
    }
    updateNumWinnersArray(newNumWinnersArray);
  }

  function handleUpdateNumWinners(newWinnerCount: number) {
    updateNumWinners(newWinnerCount);
    redistributeWinners(newWinnerCount);
  }

  return (
    <>
      <TabsContent value={StageWizardTab.SelectBracketFormat}>
        <SelectBracketFormat
          selection={editedStage.numBrackets}
          setSelection={updateNumBrackets}
        />
      </TabsContent>
      <TabsContent value={StageWizardTab.SelectBracketWinners}>
        <div className="relative">
          <div className="relative">
            <div className="flex flex-col gap-4">
              {Array.from({ length: editedStage.numBrackets || 0 }).map(
                (_, i) => (
                  <div key={i} className="flex  gap-2 items-center">
                    <div className="grow">
                      <Label className="whitespace-nowrap">
                        Bracket {i + 1}
                      </Label>
                    </div>

                    <Input
                      className="w-[100px]"
                      min={1}
                      value={editedStage.numWinnersArray[i]}
                      onChange={(e) =>
                        handleUpdateNumWinnersArray(Number(e.target.value), i)
                      }
                    />
                  </div>
                )
              )}
              {editedStage.numBrackets > 1 && (
                <div className="flex  gap-2  pt-4 border-t-[1px] items-center">
                  <div className="grow">
                    <Label className="whitespace-nowrap">
                      Total teams advancing
                    </Label>
                  </div>

                  <Input
                    className="w-[100px]"
                    min={1}
                    value={editedStage.numWinners}
                    onChange={(e) =>
                      handleUpdateNumWinners(Number(e.target.value))
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
}
