import { TournamentStageType } from "@/entities/Tournament";
import { TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { EditedTournamentStage } from "../types";
import { cn } from "@/lib/utils";
import { useStageWizardTabs } from "../hooks";
export default function TournamentStageWizardTabs({
  editedStage,
}: {
  editedStage: EditedTournamentStage;
}) {
  const tabClass = !editedStage?.type
    ? ""
    : {
        [TournamentStageType.Bracket]:
          "data-[state=active]:bg-bracket-primary data-[state=active]:text-bracket-primary-foreground",
        [TournamentStageType.Pool]:
          "data-[state=active]:bg-pool-primary data-[state=active]:text-pool-primary-foreground",
        [TournamentStageType.Points]:
          "data-[state=active]:bg-points-primary data-[state=active]:text-points-primary-foreground",
      }[editedStage.type];

  const tabs = useStageWizardTabs({ type: editedStage.type });

  return (
    <TabsList>
      {tabs?.map(({ title, value }) => (
        <TabsTrigger key={value} value={value} className={cn("grow", tabClass)}>
          {title}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
