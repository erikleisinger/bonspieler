import { TabsContent } from "@/shared/ui/tabs";
import { StageWizardTab } from "../types";
export default function PointsWizard() {
  return (
    <>
      <TabsContent value={StageWizardTab.Points}>Points</TabsContent>
    </>
  );
}
