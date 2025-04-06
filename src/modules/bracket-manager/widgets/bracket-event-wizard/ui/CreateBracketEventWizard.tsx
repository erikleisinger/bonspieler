import { useMemo, useState } from "react";

import Typography from "@/shared/ui/typography";
import { Label } from "@/shared/ui/label";
import { getNewBracketAndWinnerCount } from "../lib/getNewBracketAndWinnerCount";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import BracketFormatCard from "./BracketFormatCard";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { FaMagic } from "react-icons/fa";
import { generateBracket } from "../lib/generateBracket";
import { useBracketDispatch } from "@/modules/bracket-manager/shared/hooks";
import {
  setConnections,
  setBrackets,
} from "@/modules/bracket-manager/shared/store";
interface BracketEditorOptionsProps {
  initialNumBrackets?: number;
  initialNumSheets?: number;
  initialNumWinners?: number;
  initialTeamCount?: number;
  onRender: () => void;
}

export default function CreateBracketWizard({
  initialTeamCount = 16,
  initialNumWinners = 1,
  initialNumSheets = 8,
  onRender = () => {},
}: BracketEditorOptionsProps) {
  const [numWinners, setNumWinners] = useState(initialNumWinners);
  const [numWinnersArray, setNumWinnersArray] = useState([]);
  const [numTeams, setNumTeams] = useState(initialTeamCount);
  const [numBrackets, setNumBrackets] = useState(1);

  const dispatch = useBracketDispatch();

  function generateBracketEvent() {
    const generated = generateBracket({
      numTeams,
      numWinners: numWinnersArray,
    });
    const { originConnections, winnerConnections, loserConnections, brackets } =
      generated;
    dispatch(setBrackets, { brackets });
    dispatch(setConnections, {
      originConnections,
      winnerConnections,
      loserConnections,
    });
    onRender();
  }

  function updateNumBrackets(newNumBrackets: number) {
    const { winners, brackets } = getNewBracketAndWinnerCount(
      newNumBrackets,
      numBrackets,
      numWinners
    );
    setNumBrackets(brackets);
    setNumWinners(winners);
  }

  function handleUpdateNumWinnersArray(newWinnerCount: number, index: number) {
    const newWinners = [...numWinnersArray];
    newWinners[index] = newWinnerCount;
    setNumWinnersArray(newWinners);
    setNumWinners(newWinners.reduce((a, c) => a + c, 0));
  }

  function redistributeWinners(newNumWinners: number) {
    const newNumWinnersArray = Array.from({ length: numBrackets }).map(() => 0);
    let numWinnersToDistribute = newNumWinners;
    let currentIndex = 0;
    while (numWinnersToDistribute > 0) {
      newNumWinnersArray[currentIndex] += 1;
      numWinnersToDistribute -= 1;
      if (currentIndex === numBrackets - 1) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
    }
    setNumWinnersArray(newNumWinnersArray);
  }

  function handleUpdateNumWinners(newWinnerCount: number) {
    setNumWinners(newWinnerCount);
    redistributeWinners(newWinnerCount);
  }

  enum BracketWizardStep {
    PickTeams = "PICK_TEAMS",
    PickBrackets = "PICK_BRACKETS",
    PickWinners = "PICK_WINNERS",
  }
  const [step, setStep] = useState<BracketWizardStep>(
    BracketWizardStep.PickBrackets
  );

  function handleBracketNumSelection(newNumBrackets: number) {
    updateNumBrackets(newNumBrackets);
    setNumWinnersArray(Array.from({ length: newNumBrackets }).map(() => 1));
    setNumWinners(newNumBrackets);
    setStep(BracketWizardStep.PickWinners);
  }

  return (
    <Tabs
      value={step}
      onValueChange={setStep}
      className="h-full grid grid-rows-[auto_1fr]"
    >
      <TabsList className="w-full">
        <TabsTrigger value={BracketWizardStep.PickBrackets} className="grow">
          Format
        </TabsTrigger>
        <TabsTrigger
          value={BracketWizardStep.PickWinners}
          className="grow"
          disabled={!numBrackets}
        >
          Teams
        </TabsTrigger>
      </TabsList>
      <div className="relative">
        <TabsContent value={BracketWizardStep.PickBrackets}>
          <div className="grid grid-cols-2  gap-4 p-4">
            <BracketFormatCard
              type="Single"
              setValue={handleBracketNumSelection}
              selected={numBrackets === 1}
            />
            <BracketFormatCard
              type="Double"
              setValue={handleBracketNumSelection}
              selected={numBrackets === 2}
            />
            <BracketFormatCard
              type="Triple"
              setValue={handleBracketNumSelection}
              selected={numBrackets === 3}
            />
            <BracketFormatCard
              type="Quadruple"
              setValue={handleBracketNumSelection}
              selected={numBrackets === 4}
            />
          </div>
        </TabsContent>
        <TabsContent
          value={BracketWizardStep.PickWinners}
          className="h-full  grid grid-rows-[1fr_auto] "
        >
          <div className="relative">
            <div className="p-4 px-8 absolute inset-0 overflow-y-auto">
              <div>
                <header className="mb-4">
                  <Typography tag="h4">Teams entering the bracket</Typography>
                </header>
                <div>
                  <Input
                    value={numTeams}
                    onChange={(e) => setNumTeams(Number(e.target.value))}
                  />
                </div>
                <header className="mb-4 mt-8">
                  <Typography tag="h4">
                    Teams advancing to the next round
                  </Typography>
                </header>

                <div className="relative">
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: numBrackets }).map((_, i) => (
                      <div key={i} className="flex  gap-2 items-center">
                        <div className="grow">
                          <Label className="whitespace-nowrap">
                            Bracket {i + 1}
                          </Label>
                        </div>

                        <Input
                          className="w-[100px]"
                          min={1}
                          value={numWinnersArray[i]}
                          onChange={(e) =>
                            handleUpdateNumWinnersArray(
                              Number(e.target.value),
                              i
                            )
                          }
                        />
                      </div>
                    ))}
                    {numBrackets > 1 && (
                      <div className="flex  gap-2  pt-4 border-t-[1px] items-center">
                        <div className="grow">
                          <Label className="whitespace-nowrap">
                            Total teams advancing
                          </Label>
                        </div>

                        <Input
                          className="w-[100px]"
                          min={1}
                          value={numWinners}
                          onChange={(e) =>
                            handleUpdateNumWinners(Number(e.target.value))
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="p-4 flex justify-center shadow-md">
            <Button size="lg" onClick={generateBracketEvent}>
              <FaMagic /> Generate Brackets
            </Button>
          </footer>
        </TabsContent>
      </div>
    </Tabs>
  );
}
