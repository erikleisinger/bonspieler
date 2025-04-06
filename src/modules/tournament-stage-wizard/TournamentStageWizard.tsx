import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Tabs, TabsContent } from "@/shared/ui/tabs";
import { useMemo, useState } from "react";
import { TournamentStageType } from "@/entities/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";
import { StageWizardTab } from "@/modules/tournament-stage-wizard/shared/types";
import {
  EditedBracketStage,
  EditedTournamentStage,
  EditedPoolStage,
  EditedPointsStage,
  GeneratedStage,
  StageWinnerFormat,
} from "@/modules/tournament-stage-wizard/shared/types";
import { BracketWizard } from "./widgets/bracket-wizard";
import EditableText from "@/shared/ui/editable-text";
import { PointsWizard } from "./widgets/points-wizard";
import { PoolWizard } from "./widgets/pool-wizard";
import { useStageWizardNavigation } from "@/modules/tournament-stage-wizard/shared/hooks";
import { getModalStyle, StageWizardContext } from "./shared/lib";
import {
  TournamentStageWizardTabs,
  TournamentStageWizardNavigation,
} from "./shared/ui";
import { getStageCardStyle } from "./shared/lib";
import { EditNumStageTeams, SelectStageType } from "./features";
import { cn } from "@/lib/utils";
import { SelectStageWinnerFormat } from "./features/select-stage-winner-format";
import { SelectPointsConditions } from "./features/select-points-conditions";
import Typography from "@/shared/ui/typography";
import { PointsCondition } from "./shared/types/PointsConditions";

const defaultConditions = () => ({
  [PointsCondition.Win]: 0,
  [PointsCondition.Draw]: 0,
  [PointsCondition.Loss]: 0,
  [PointsCondition.PointsScored]: 0,
  [PointsCondition.EndsWon]: 0,
  [PointsCondition.PointsStolen]: 0,
});

const defaultStage = (): EditedTournamentStage => ({
  id: generateUUID(),
  name: "New Stage",
  type: null,
  numTeams: 16,
  winnerFormat: null,
  conditions: defaultConditions(),
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

  const stageType = useMemo(() => {
    return editedStage.type;
  }, [editedStage.type]);

  const [activeTab, setActiveTab] = useState<StageWizardTab>(
    StageWizardTab.SelectStageType
  );
  const { goBack, goNext, generateStage } = useStageWizardNavigation({
    activeTab,
    setActiveTab,
    stageType: editedStage.type,
  });

  function updateBracketStage(updates?: Partial<EditedBracketStage>) {
    setEditedStage((prev) => {
      const {
        id,
        name,
        numTeams,
        winnerFormat,
        conditions = defaultConditions(),
      } = prev;
      return {
        type: TournamentStageType.Bracket,
        id,
        name,
        numTeams,
        winnerFormat,
        conditions,
        numWinners:
          prev.type === TournamentStageType.Bracket ? prev.numWinners : 1,
        numWinnersArray:
          prev.type === TournamentStageType.Bracket
            ? prev.numWinnersArray
            : [1],
        numBrackets:
          prev.type === TournamentStageType.Bracket ? prev.numBrackets : null,
        ...(updates || {}),
      };
    });
  }

  function updateStageWinnerFormat(winnerFormat: StageWinnerFormat) {
    setEditedStage((prev) => {
      return {
        ...prev,
        winnerFormat,
      };
    });
  }

  function updatePointsStage(updates?: Partial<EditedPointsStage>) {
    setEditedStage((prev) => {
      const { id, name, numTeams, winnerFormat, conditions } = prev;
      return {
        type: TournamentStageType.Points,
        id,
        name,
        numTeams,
        winnerFormat,
        conditions: conditions || defaultConditions(),
        ...(updates || {}),
      };
    });
  }

  function updateConditions(conditions: PointsConditions) {
    setEditedStage((prev) => {
      return {
        ...prev,
        conditions,
      };
    });
  }

  function updatePoolStage(updates?: Partial<EditedPoolStage>) {
    setEditedStage((prev) => {
      const { id, name, numTeams, winnerFormat, conditions } = prev;
      return {
        type: TournamentStageType.Pool,
        id,
        name,
        numTeams,
        winnerFormat,
        conditions: conditions || defaultConditions(),
        numWinners:
          prev.type === TournamentStageType.Pool ? prev.numWinners : 1,
        numWinnersArray:
          prev.type === TournamentStageType.Pool ? prev.numWinnersArray : [1],
        numPools: prev.type === TournamentStageType.Pool ? prev.numPools : 1,
        numGamesPerTeam:
          prev.type === TournamentStageType.Pool ? prev.numGamesPerTeam : 1,
        format: prev.type === TournamentStageType.Pool ? prev.format : null,
        avoidCollisions:
          prev.type === TournamentStageType.Pool ? prev.avoidCollisions : false,
        ...(updates || {}),
      };
    });
  }

  function updateStageType(type: TournamentStageType) {
    switch (type) {
      case TournamentStageType.Bracket: {
        updateBracketStage();
        break;
      }
      case TournamentStageType.Pool: {
        updatePoolStage();
        break;
      }
      case TournamentStageType.Points: {
        updatePointsStage();
        break;
      }
      default: {
        setEditedStage((prev) => ({
          ...prev,
          type: null,
        }));
      }
    }
  }

  const wizardStyle = useMemo(() => {
    if (!editedStage.type) return {};
    return {
      [TournamentStageType.Bracket]: {
        "--primary": "var(--bracket-primary)",
        "--primary-foreground": "var(--bracket-primary-foreground)",
        "--primary-muted": "var(--bracket-muted)",
      },
      [TournamentStageType.Pool]: {
        "--primary": "var(--pool-primary)",
        "--primary-foreground": "var(--pool-primary-foreground)",
        "--primary-muted": "var(--pool-muted)",
      },
      [TournamentStageType.Points]: {
        "--primary": "var(--pool-primary)",
        "--primary-foreground": "var(--pool-primary-foreground)",
        "--primary-muted": "var(--pool-muted)",
      },
    }[editedStage.type];
  }, [editedStage.type]);

  return (
    <StageWizardContext value={{ type: editedStage.type }}>
      <DialogContent
        className={cn(
          "grid grid-rows-[auto_1fr_auto] h-[800px] max-h-[90vh] p-0 gap-4"
        )}
        style={wizardStyle}
      >
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
            <EditNumStageTeams
              numTeams={editedStage.numTeams}
              setNumTeams={(newValue: number) =>
                setEditedStage((prev) => ({
                  ...prev,
                  numTeams: newValue,
                }))
              }
            />
          </div>
        </DialogHeader>
        <Tabs
          className="relative h-full grid grid-rows-[auto_1fr_auto]"
          value={activeTab}
          onValueChange={(v: StageWizardTab) => setActiveTab(v)}
        >
          <TournamentStageWizardTabs editedStage={editedStage} />
          <div className="relative">
            <div className="absolute inset-0 p-4 overflow-auto">
              {!editedStage.type ||
              activeTab === StageWizardTab.SelectStageType ? (
                <TabsContent
                  value={StageWizardTab.SelectStageType}
                  className="my-0"
                >
                  <SelectStageType
                    stageType={stageType}
                    setStageType={updateStageType}
                  />
                </TabsContent>
              ) : activeTab === StageWizardTab.SelectStageWinnerFormat ? (
                <>
                  <SelectStageWinnerFormat
                    format={editedStage.winnerFormat}
                    setFormat={updateStageWinnerFormat}
                  />

                  {editedStage.winnerFormat === StageWinnerFormat.Points && (
                    <>
                      <header className="mt-4">
                        <Typography tag="h4">Points System</Typography>
                        <Typography
                          tag="p"
                          className="text-muted italic text-sm"
                        >
                          Configure how points are calculated.
                        </Typography>
                      </header>
                      <div className="my-4">
                        <SelectPointsConditions
                          conditions={editedStage.conditions}
                          setConditions={updateConditions}
                        />
                      </div>
                    </>
                  )}
                </>
              ) : editedStage.type === TournamentStageType.Bracket ? (
                <BracketWizard
                  editedStage={editedStage}
                  setEditedStage={updateBracketStage}
                  goNext={goNext || (() => {})}
                />
              ) : editedStage.type === TournamentStageType.Points ? (
                <PointsWizard />
              ) : editedStage.type === TournamentStageType.Pool ? (
                <PoolWizard
                  editedStage={editedStage}
                  setEditedStage={updatePoolStage}
                  goNext={goNext || (() => {})}
                />
              ) : (
                <div />
              )}
            </div>
          </div>

          <TournamentStageWizardNavigation
            goBack={goBack}
            goNext={goNext}
            generateStage={generateStage}
          />
        </Tabs>
      </DialogContent>
    </StageWizardContext>
  );
}
