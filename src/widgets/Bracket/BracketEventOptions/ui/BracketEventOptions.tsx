import { useState, useId, useEffect } from "react";

import { useAppSelector } from "@/lib/store";
import {
  getBracketEventBrackets,
  getBracketEventConnections,
  getBracketEventSchedule,
  getBracketEventNumWinners,
} from "@/entities/BracketEvent";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { HiOutlinePlus } from "react-icons/hi";
import { EditStageName } from "@/features/Stage/EditStageName";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { SetEventSheets } from "@/features/SetEventSheets";
import { SetStageDrawTimes } from "@/features/Stage/SetStageDrawTimes";
import { BracketEventInfo } from "@/entities/BracketEvent";
import { EditableBracketTeamList } from "@/features/Bracket/EditableBracketTeamList";
export default function BracketEventOptions({
  initialTab = "overview",
  onClose,
}: {
  initialTab: string;
  onClose: () => void;
}) {
  const drawTimesContainerId = useId();
  const teamsContainerId = useId();

  const brackets = useAppSelector(getBracketEventBrackets);
  const connections = useAppSelector(getBracketEventConnections);
  const schedule = useAppSelector(getBracketEventSchedule);
  const numWinners = useAppSelector(getBracketEventNumWinners);
  const [selectedTab, setSelectedTab] = useState(initialTab);

  useEffect(() => {
    setSelectedTab(initialTab);
  }, [initialTab]);

  return (
    <div className="p-4 grid grid-rows-[auto_1fr_auto] absolute inset-0">
      <header className=" grid grid-cols-[1fr,auto] justify-between mb-4 md:mb-6 pt-2 pl-2 gap-8">
        <EditStageName />

        <Button variant="ghost" size="icon" onClick={onClose}>
          <HiOutlinePlus
            className="rotate-45"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        </Button>
      </header>
      <div className="relative">
        <div className="absolute inset-0 overflow-auto">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview" className="grow">
                Overview
              </TabsTrigger>
              <TabsTrigger value="schedule" className="grow">
                Schedule
              </TabsTrigger>
              <TabsTrigger value="teams" className="grow">
                Teams
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className=" bg-glass p-4 rounded-md">
                <BracketEventInfo
                  brackets={brackets}
                  connections={connections}
                  schedule={schedule}
                  winners={numWinners}
                />
              </div>
            </TabsContent>
            <TabsContent value="schedule">
              <div className=" bg-glass p-4">
                <SetEventSheets />
              </div>
              <div className="mt-4 bg-glass p-4 flex flex-col">
                <header className="flex justify-between items-center">
                  <Label htmlFor={drawTimesContainerId}>Draw schedule</Label>
                </header>
                <div
                  id={drawTimesContainerId}
                  className="mt-4 flex flex-col gap-2"
                >
                  <SetStageDrawTimes />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="teams">
              <div className="mt-4 bg-glass p-4 flex flex-col">
                <header className="flex justify-between items-center">
                  <Label htmlFor={teamsContainerId}>Teams</Label>
                </header>

                <div id={teamsContainerId} className="mt-4">
                  <EditableBracketTeamList />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
