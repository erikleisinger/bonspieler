import { useState, useId, useContext, useMemo } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { Button } from "@/shared/ui/button";

import NumberSheetsSelect from "@/shared/ui/number-sheets-select";
import { DateTimePicker } from "@/shared/ui/date-time-picker";
import { Label } from "@/shared/ui/label";
import Typography from "@/shared/ui/typography";
import { HiOutlinePlus } from "react-icons/hi";
import SaveButton from "@/shared/ui/save-button";
import { DrawTimeValidationContext } from "@/features/DrawTimeWarnings";

import { FaWandMagicSparkles } from "react-icons/fa6";
import Tooltip from "@/shared/ui/tooltip";

import DrawInfo from "./DrawInfo";
import EditEventName from "./EditEventName";
export default function BracketEventOptions({
  drawTimes,
  eventName,
  setDrawTimes,
  setEventName,
  updateNumSheetsAndSchedule,
  updateNumSheets,
  totalNumTeams,
  totalNumSheets,
  totalNumWinners,
  totalNumDraws,
  onClose,
}: {
  drawTimes: { [key: number]: Date };
  eventName: string;
  setDrawTimes: (e: { [key: number]: Date }) => void;
  setEventName: (newName: string) => void;
  updateNumSheetsAndSchedule: (num: number) => void;
  updateNumSheets: (num: number) => void;
  totalNumTeams: number;
  totalNumSheets: number;
  totalNumWinners: number;
  totalNumDraws: number;
  onClose: () => void;
}) {
  const [tempDrawTimes, setTempDrawTimes] = useState({ ...drawTimes });
  const [tempEventName, setTempEventName] = useState(eventName);
  const [tempNumSheets, setTempNumSheets] = useState(totalNumSheets);

  function updateDrawTime(newDate: Date, index: number) {
    const newDrawTimes = { ...tempDrawTimes };
    newDrawTimes[index] = newDate;
    setTempDrawTimes(newDrawTimes);
  }

  async function recalculate() {
    updateNumSheetsAndSchedule(tempNumSheets);
    setDrawTimes(tempDrawTimes);
  }

  async function save() {
    updateNumSheets(tempNumSheets);
    setDrawTimes(tempDrawTimes);
    setEventName(tempEventName);
  }

  const drawTimesContainerId = useId();

  const { brackets, schedule } = useContext(BracketContext);

  const numBrackets = brackets.length;

  const unsavedChanges = useMemo(() => {
    if (JSON.stringify(drawTimes) !== JSON.stringify(tempDrawTimes))
      return true;
    if (tempNumSheets !== totalNumSheets) return true;

    return false;
  }, [tempDrawTimes, drawTimes, totalNumSheets, tempNumSheets]);

  return (
    <div className="p-4 grid grid-rows-[auto_1fr_auto] absolute inset-0">
      <header className=" flex justify-between mb-8 pt-2 pl-2 gap-8">
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
          <div className=" bg-glass p-4 rounded-md">
            <div className="flex justify-between">
              Teams <strong>{totalNumTeams}</strong>
            </div>
            <div className="flex justify-between">
              Brackets <strong>{numBrackets}</strong>
            </div>
            <div className="flex justify-between">
              Teams advancing <strong>{totalNumWinners}</strong>
            </div>
            <div className="flex justify-between">
              Draws <strong>{totalNumDraws}</strong>
            </div>
          </div>
          <div className="p-4 pt-8 flex justify-between">
            <Typography tag="h4">Schedule</Typography>
            <Tooltip text="Recalculate draw times">
              <Button
                size="icon"
                variant={tempNumSheets !== totalNumSheets ? "default" : "ghost"}
                onClick={recalculate}
              >
                <FaWandMagicSparkles />
              </Button>
            </Tooltip>
          </div>

          <div className=" bg-glass p-4">
            <NumberSheetsSelect
              numSheets={tempNumSheets}
              setNumSheets={setTempNumSheets}
            >
              Sheets
            </NumberSheetsSelect>
          </div>
          <div className="mt-4 bg-glass p-4 flex flex-col">
            <header className="flex justify-between items-center">
              <Label htmlFor={drawTimesContainerId}>Draw schedule</Label>
            </header>
            <DrawTimeValidationContext
              numSheets={tempNumSheets}
              schedule={schedule}
              numDraws={totalNumDraws}
              drawTimes={tempDrawTimes}
            >
              <div
                id={drawTimesContainerId}
                className="mt-4 flex flex-col gap-2"
              >
                {Array.from({ length: totalNumDraws }).map((_, i) => {
                  return (
                    <DrawInfo key={i} drawNumber={i + 1} withValidation={true}>
                      <DateTimePicker
                        id={"draw-time-" + i}
                        date={tempDrawTimes[i + 1]}
                        setDate={(e) => updateDrawTime(e, i + 1)}
                        min={tempDrawTimes[i]}
                        max={tempDrawTimes[i + 2]}
                        side="left"
                      />
                    </DrawInfo>
                  );
                })}
              </div>
            </DrawTimeValidationContext>
          </div>
        </div>
      </div>
      <footer className="flex justify-center">
        <SaveButton
          disabled={!unsavedChanges}
          className="min-w-[300px] m-auto mt-2"
          onClick={save}
          text={["Update event", "Updating event...", "Event updated!"]}
        />
      </footer>
    </div>
  );
}
