import { useContext, useState } from "react";
import { useAppSelector } from "@/lib/store";
import { getBracketEventSchedule } from "@/entities/BracketEvent";
import DrawTimeValidationContext from "./DrawTimeValidationContext";
import DrawInfo from "./DrawInfo";
import { DateTimePicker } from "@/shared/ui/date-time-picker";
import { BracketDrawTimes } from "@/entities/Bracket";
import SetterButton from "./SetterButton";
export default function SetEventDrawTimes({
  numSheets,
  numDraws,
  drawTimes,
  updateDrawTimes,
}: {
  numSheets: number;
  numDraws: number;
  drawTimes: BracketDrawTimes;
  updateDrawTimes: (newDrawTimes: BracketDrawTimes) => void;
}) {
  const schedule = useAppSelector(getBracketEventSchedule);
  const [tempDrawTimes, setTempDrawTimes] = useState({ ...drawTimes });

  function updateDrawTime(newDate: Date, index: number) {
    const newDrawTimes = { ...tempDrawTimes };
    newDrawTimes[index] = newDate;
    setTempDrawTimes(newDrawTimes);
  }
  return (
    <DrawTimeValidationContext
      numSheets={numSheets}
      schedule={schedule}
      numDraws={numDraws}
      drawTimes={tempDrawTimes}
    >
      {Array.from({ length: numDraws }).map((_, i) => {
        return (
          <DrawInfo key={i} drawNumber={i + 1} withValidation={true}>
            <DateTimePicker
              id={"draw-time-" + i}
              date={tempDrawTimes[i + 1]}
              setDate={(e: Date) => updateDrawTime(e, i + 1)}
              min={tempDrawTimes[i]}
              max={tempDrawTimes[i + 2]}
              side="left"
            />
          </DrawInfo>
        );
      })}
      <footer className="mt-4 flex justify-center">
        <SetterButton
          className="w-[300px]"
          setDrawTimes={() => updateDrawTimes(tempDrawTimes)}
        />
      </footer>
    </DrawTimeValidationContext>
  );
}
