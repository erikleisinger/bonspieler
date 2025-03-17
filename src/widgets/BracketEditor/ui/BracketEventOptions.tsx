import { useState, useId, useContext, useEffect } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import type { BracketDrawTimes } from "@/entities/Bracket";

import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { HiOutlinePlus } from "react-icons/hi";
import EditEventName from "./EditEventName";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { SetEventSheets } from "@/features/SetEventSheets";
import { SetEventDrawTimes } from "@/features/SetEventDrawTimes";
import { BracketEventInfo } from "@/entities/BracketEvent";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { EditableBracketTeamList } from "@/features/EditableBracketTeamList";
export default function BracketEventOptions({
  drawTimes,
  eventName,
  initialTab = "overview",
  setDrawTimes,
  setEventName,
  totalNumSheets,
  numWinners,
  totalNumDraws,
  onClose,
}: {
  drawTimes: BracketDrawTimes;
  eventName: string;
  initialTab: string;
  setDrawTimes: (e: BracketDrawTimes) => void;
  setEventName: (newName: string) => void;
  totalNumSheets: number;
  numWinners: number[];
  totalNumDraws: number;
  onClose: () => void;
}) {
  const [tempNumSheets, setTempNumSheets] = useState(totalNumSheets);

  const drawTimesContainerId = useId();
  const teamsContainerId = useId();

  const { brackets, connections, schedule } = useContext(BracketContext);

  const [selectedTab, setSelectedTab] = useState(initialTab);

  useEffect(() => {
    setSelectedTab(initialTab);
  }, [initialTab]);

  return (
    <div className="p-4 grid grid-rows-[auto_1fr_auto] absolute inset-0">
      <header className=" grid grid-cols-[1fr,auto] justify-between mb-4 md:mb-6 pt-2 pl-2 gap-8">
        <EditEventName eventName={eventName} setEventName={setEventName} />

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
                  winners={numWinners}
                  brackets={brackets}
                  schedule={schedule}
                  connections={connections}
                />
              </div>
            </TabsContent>
            <TabsContent value="schedule">
              <div className=" bg-glass p-4">
                <SetEventSheets
                  numSheets={tempNumSheets}
                  setNumSheets={setTempNumSheets}
                />
              </div>
              <div className="mt-4 bg-glass p-4 flex flex-col">
                <header className="flex justify-between items-center">
                  <Label htmlFor={drawTimesContainerId}>Draw schedule</Label>
                </header>
                <div
                  id={drawTimesContainerId}
                  className="mt-4 flex flex-col gap-2"
                >
                  <SetEventDrawTimes
                    numSheets={tempNumSheets}
                    numDraws={totalNumDraws}
                    drawTimes={drawTimes}
                    updateDrawTimes={setDrawTimes}
                  />
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
