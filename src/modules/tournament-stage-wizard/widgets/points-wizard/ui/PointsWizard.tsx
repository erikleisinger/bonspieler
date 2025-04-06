import { TabsContent } from "@/shared/ui/tabs";
import { StageWizardTab } from "@/modules/tournament-stage-wizard/shared/types";
export default function PointsWizard() {
  return (
    <>
      <TabsContent value={StageWizardTab.Points}>Points</TabsContent>
    </>
  );
}
