import { useState, useId, useMemo, useContext } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { Button } from "@/shared/ui/button";
import NumberSheetsSelect from "@/shared/ui/number-sheets-select";
import { DateTimePicker } from "@/shared/ui/date-time-picker";
import { Label } from "@/shared/ui/label";
import Typography from "@/shared/ui/typography";
import { HiOutlinePlus } from "react-icons/hi";
import SaveButton from "@/shared/ui/save-button";

import { getDrawTimeWarnings } from "@/features/DrawTimeWarnings";
import { FaExclamationTriangle } from "react-icons/fa";
import Tooltip from "@/shared/ui/tooltip";
export default function BracketEventOptions({
  drawTimes,
  setDrawTimes,
  updateNumSheetsAndSchedule,
  updateNumSheets,
  totalNumTeams,
  totalNumSheets,
  totalNumWinners,
  totalNumDraws,
  onClose,
}: {
  drawTimes: { [key: number]: Date };
  setDrawTimes: (e: { [key: number]: Date }) => void;
  updateNumSheetsAndSchedule: (num: number) => void;
  updateNumSheets: (num: number) => void;
  totalNumTeams: number;
  totalNumSheets: number;
  totalNumWinners: number;
  totalNumDraws: number;
  onClose: () => void;
}) {
  const [tempDrawTimes, setTempDrawTimes] = useState({ ...drawTimes });

  function updateDrawTime(newDate: Date, index: number) {
    const newDrawTimes = { ...tempDrawTimes };
    newDrawTimes[index] = newDate;
    setTempDrawTimes(newDrawTimes);
  }

  async function recalculate() {
    updateNumSheetsAndSchedule(totalNumSheets);
    setDrawTimes(tempDrawTimes);
  }

  const drawTimesContainerId = useId();

  const warnings = useMemo(() => {
    return getDrawTimeWarnings(tempDrawTimes);
  }, [JSON.stringify(tempDrawTimes)]);

  const { schedule } = useContext(BracketContext);
  function getNumGamesForDraw(drawNum) {
    return Object.values(schedule).filter((i) => i == drawNum)?.length || 0;
  }
  return (
    <div className="p-4 grid grid-rows-[auto_1fr_auto] absolute inset-0">
      <header className=" flex justify-between mb-8 pt-2 pl-2">
        <Typography tag="h2">Event Options</Typography>
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
              Winners <strong>{totalNumWinners}</strong>
            </div>
            <div className="flex justify-between">
              Draws <strong>{totalNumDraws}</strong>
            </div>
          </div>
          <div className="p-4 pt-8">
            <Typography tag="h4">Schedule</Typography>
          </div>

          <div className=" bg-glass p-4">
            <NumberSheetsSelect
              numSheets={totalNumSheets}
              setNumSheets={updateNumSheets}
            >
              Sheets
            </NumberSheetsSelect>
          </div>
          <div className="mt-4 bg-glass p-4 flex flex-col">
            <header>
              <Label htmlFor={drawTimesContainerId}>Draw schedule</Label>
            </header>

            <div id={drawTimesContainerId} className="mt-4 flex flex-col gap-2">
              {Array.from({ length: totalNumDraws }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="grid grid-cols-[70px,1fr] gap-2 items-center"
                  >
                    <div>
                      <div className="flex gap-2">
                        <Label htmlFor={"draw-time-" + i}>Draw {i + 1}</Label>
                        {warnings[i + 1] && (
                          <Tooltip text={warnings[i + 1].join("\n")}>
                            <FaExclamationTriangle className="text-destructive text-sm" />
                          </Tooltip>
                        )}
                      </div>
                      <div className="text-xs">
                        {getNumGamesForDraw(i + 1)} game(s)
                      </div>
                    </div>

                    <DateTimePicker
                      id={"draw-time-" + i}
                      date={tempDrawTimes[i + 1]}
                      setDate={(e) => updateDrawTime(e, i + 1)}
                      min={tempDrawTimes[i]}
                      max={tempDrawTimes[i + 2]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-center">
        <SaveButton
          className="min-w-[300px] m-auto mt-2"
          onClick={recalculate}
        />
      </footer>
    </div>
  );
}
