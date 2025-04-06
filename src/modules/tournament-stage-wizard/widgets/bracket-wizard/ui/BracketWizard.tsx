import { TabsContent } from "@radix-ui/react-tabs";
import {
  EditedBracketStage,
  EditedTournamentStage,
  StageWizardTab,
} from "@/modules/tournament-stage-wizard/shared/types";
import { SelectBracketFormat } from "@/modules/tournament-stage-wizard/features/select-bracket-format";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import BracketPreview from "./BracketPreview";
export default function BracketWizard({
  editedStage,
  setEditedStage,
  goNext,
}: {
  editedStage: EditedBracketStage;
  setEditedStage: (updates: Partial<EditedBracketStage>) => void;
  goNext: () => void;
}) {
  function updateNumWinners(numWinners: number) {
    setEditedStage({ numWinners });
  }

  function updateNumWinnersArray(newWinnerArray: number[]) {
    setEditedStage({ numWinnersArray: newWinnerArray });
  }

  function updateNumBrackets(newNumBrackets: number) {
    setEditedStage({
      numBrackets: newNumBrackets,
      numWinnersArray: Array.from({ length: newNumBrackets }, () => 1),
      numWinners: newNumBrackets,
    });
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
