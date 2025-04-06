import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { SelectStageType } from "@/modules/tournament-stage-manager/features/select-stage-type";
import { useState, useMemo } from "react";
import { TournamentStageType } from "@/entities/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";
import { StageWizardTab } from "../types";
import { BracketWizard } from "./BracketWizard";
import EditableText from "@/shared/ui/editable-text";
import EditableValue from "@/shared/ui/editable-value";

import type { EditedTournamentStage } from "../types";
import NumberInput from "@/shared/ui/number-input";
import Typography from "@/shared/ui/typography";
import { Label } from "@/shared/ui/label";
import PointsWizard from "./PointsWizard";
import PoolWizard from "./PoolWizard";
import { Button } from "@/shared/ui/button";
import useStageWizardNavigation from "../hooks/useStageWizardNavigation";
import { FaMagic } from "react-icons/fa";
import { generateBracket } from "../lib";
import type { GeneratedStage } from "../types";
const defaultStage = () => ({
  id: generateUUID(),
  name: "New Stage",
  type: null,
  numTeams: 16,
});

export function TournamentStageWizard({
  initialStage = defaultStage(),
  onGenerate,
}: {
  initialStage?: EditedTournamentStage;
  onGenerate: (generatedStage: GeneratedStage) => void;
}) {
  const [editedStage, setEditedStage] =
    useState<EditedTournamentStage>(initialStage);

  function updateStageType(type: TournamentStageType) {
    setEditedStage((prev) => ({
      ...prev,
      type,
    }));
    if (!type) return;
    if (type === TournamentStageType.Bracket) {
      setActiveTab(StageWizardTab.SelectBracketFormat);
      setEditedStage((prev) => ({
        ...prev,
        numTeams: 16,
        numWinners: 1,
        numWinnersArray: [1],
        numBrackets: 1,
      }));
    }
  }

  const stageType = useMemo(() => editedStage.type, [editedStage.type]);

  const [activeTab, setActiveTab] = useState(StageWizardTab.SelectStageType);

  const tabs = useMemo(() => {
    if (stageType === TournamentStageType.Bracket) {
      return [
        {
          title: "Format",
          value: StageWizardTab.SelectBracketFormat,
        },
        {
          title: "Winners",
          value: StageWizardTab.SelectBracketWinners,
          disabled: () => !editedStage?.numWinners,
        },
      ];
    } else if (stageType === TournamentStageType.Pool) {
      return [
        {
          title: "Format",
          value: StageWizardTab.SelectPoolFormat,
        },
        {
          title: "Options",
          value: StageWizardTab.SelectPoolOptions,
        },
      ];
    }
    return [];
  }, [stageType]);

  const { goNext, goBack, isLast } = useStageWizardNavigation({
    activeTab,
    setActiveTab,
    stageType: editedStage.type,
  });

  function generateStage() {
    if (editedStage.type === TournamentStageType.Bracket) {
      const { numWinnersArray, numTeams } = editedStage;
      onGenerate({
        id: editedStage.id,
        name: editedStage.name,
        type: TournamentStageType.Bracket,
        ...generateBracket({ numTeams, numWinnersArray }),
      });
    }
  }

  return (
    <DialogContent className="grid grid-rows-[auto_1fr_auto] h-[800px] max-h-[90vh] p-0 gap-4">
      <DialogHeader className="p-6 pb-0">
        <DialogTitle className="w-fit mr-8">
          <EditableText
            tag="h2"
            value={editedStage.name}
            onChange={(v) => {
              setEditedStage((prev) => ({
                ...prev,
                name: v,
              }));
            }}
          />
        </DialogTitle>

        <div className="w-fit flex items-baseline gap-4">
          <EditableValue
            editingChildren={
              <div className="flex gap-2 items-baseline">
                <NumberInput
                  id="stage-wizard-num-teams"
                  autoFocus={true}
                  hideButtons={true}
                  number={editedStage.numTeams}
                  max={32}
                  min={2}
                  setNumber={(v) => {
                    setEditedStage((prev) => ({
                      ...prev,
                      numTeams: v,
                    }));
                  }}
                ></NumberInput>
                <Label className="font-normal" htmlFor="stage-wizard-num-teams">
                  teams
                </Label>
              </div>
            }
          >
            <div className="flex items-baseline gap-2">
              <Typography tag="h4"> {editedStage.numTeams}</Typography>
              <Label
                className="font-normal cursor-pointer"
                htmlFor="stage-wizard-num-teams"
              >
                teams
              </Label>
            </div>
          </EditableValue>
        </div>
      </DialogHeader>
      <Tabs
        className="relative h-full grid grid-rows-[auto_1fr_auto]"
        value={activeTab}
        onValueChange={(v: StageWizardTab) => setActiveTab(v)}
      >
        <TabsList>
          <TabsTrigger value={StageWizardTab.SelectStageType} className="grow">
            Stage Type
          </TabsTrigger>
          {stageType &&
            tabs?.map(({ title, value, disabled }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="grow"
                disabled={disabled ? disabled() : false}
              >
                {title}
              </TabsTrigger>
            ))}
        </TabsList>
        <div className="relative">
          <div className="absolute inset-0 p-4">
            {!stageType || activeTab === StageWizardTab.SelectStageType ? (
              <TabsContent
                value={StageWizardTab.SelectStageType}
                className="my-0"
              >
                <SelectStageType
                  stageType={stageType}
                  setStageType={updateStageType}
                />
              </TabsContent>
            ) : stageType === TournamentStageType.Bracket ? (
              <BracketWizard
                editedStage={editedStage}
                setEditedStage={setEditedStage}
                setTab={setActiveTab}
              />
            ) : stageType === TournamentStageType.Points ? (
              <PointsWizard />
            ) : stageType === TournamentStageType.Pool ? (
              <PoolWizard
                editedStage={editedStage}
                setEditedStage={setEditedStage}
                setTab={setActiveTab}
              />
            ) : (
              <div />
            )}
          </div>
        </div>

        <footer className="px-4 flex justify-between">
          <Button
            onClick={goBack || (() => {})}
            disabled={!goBack}
            variant="secondary"
          >
            Back
          </Button>
          {isLast ? (
            <Button onClick={generateStage}>
              <FaMagic /> Generate Stage
            </Button>
          ) : (
            <Button
              onClick={goNext || (() => {})}
              disabled={!goNext}
              variant="default"
            >
              Next
            </Button>
          )}
        </footer>
      </Tabs>
    </DialogContent>
  );
}
