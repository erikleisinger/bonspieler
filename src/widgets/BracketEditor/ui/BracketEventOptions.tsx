import { useState, useId } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { FaCog } from "react-icons/fa";
import NumberSheetsSelect from "@/shared/ui/number-sheets-select";
import { DatePicker } from "@/shared/ui/date-picker";
import { Label } from "@/shared/ui/label";
export default function BracketEventOptions({
  drawTimes,
  setDrawTimes,
  updateNumSheetsAndSchedule,
  updateNumSheets,
  totalNumTeams,
  totalNumSheets,
  totalNumWinners,
  totalNumDraws,
}: {
  drawTimes: { [key: number]: Date };
  setDrawTimes: (e: { [key: number]: Date }) => void;
  updateNumSheetsAndSchedule: (num: number) => void;
  updateNumSheets: (num: number) => void;
  totalNumTeams: number;
  totalNumSheets: number;
  totalNumWinners: number;
  totalNumDraws: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function updateDrawTime(newDate: Date, index: number) {
    const newDrawTimes = { ...drawTimes };
    newDrawTimes[index] = newDate;
    setDrawTimes(newDrawTimes);
  }

  const drawTimesContainerId = useId();
  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button>
          <FaCog /> Event options
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-glass text-glass-foreground backdrop-blur-s p-4">
        <div className="min-w-[300px] max-w-[90vw]">
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

          <div className="mt-4 bg-glass p-4">
            <NumberSheetsSelect
              numSheets={totalNumSheets}
              setNumSheets={updateNumSheets}
            >
              Sheets
            </NumberSheetsSelect>
            <Button
              className="w-full mt-2"
              variant="secondary"
              onClick={() => updateNumSheetsAndSchedule(totalNumSheets)}
            >
              Update
            </Button>
          </div>
          <div className="mt-4 bg-glass p-4 flex flex-col">
            <Label htmlFor={drawTimesContainerId}>Draw schedule</Label>
            <div id={drawTimesContainerId} className="mt-4">
              {Array.from({ length: totalNumDraws }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="grid grid-cols-[70px,1fr] gap-2 items-center"
                  >
                    <Label htmlFor={"draw-time-" + i}>Draw {i + 1}</Label>
                    <DatePicker
                      id={"draw-time-" + i}
                      date={drawTimes[i + 1]}
                      setDate={(e) => updateDrawTime(e, i + 1)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
