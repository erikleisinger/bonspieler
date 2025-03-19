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
import SaveButton from "@/shared/ui/save-button";
export default function BracketEventOptions({
  initialTab = "overview",
  onClose,
  onSave,
  onEndView,
}: {
  initialTab: string;
  onClose: () => void;
  onSave: () => void;
  onEndView: () => void;
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
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="absolute inset-0 overflow-auto grid grid-rows-[auto_1fr] gap-4"
        >
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
          <TabsContent value="overview" className="relative ">
            <div className="  grid grid-rows-[auto_1fr] gap-4 absolute inset-0">
              <div className="bg-glass p-4 rounded-md">
                <BracketEventInfo
                  brackets={brackets}
                  connections={connections}
                  schedule={schedule}
                  winners={numWinners}
                />
              </div>

              <div className="flex items-end ">
                <div className="w-full flex justify-center">
                  <SaveButton onClick={onSave} className="w-[300px]">
                    Save
                  </SaveButton>
                </div>
              </div>
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
  );
}
