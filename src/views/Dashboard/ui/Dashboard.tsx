import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/shared/ui/tabs";
export default function Dashboard() {
  return (
    <Tabs className="absolute inset-0 grid grid-rows-[auto_1fr]">
      <header className="p-4 flex justify-between">
        <div>
          <div>Tournament name</div>
        </div>
        <TabsList>
          <TabsTrigger value="stages">Stages</TabsTrigger>
        </TabsList>
      </header>

      <div className="relative">
        <TabsContent value="stages" className="absolute inset-0">
          Stages
        </TabsContent>
      </div>
    </Tabs>
  );
}
