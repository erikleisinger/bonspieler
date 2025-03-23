import { useState } from "react";

import { getBracketGamesSchedule } from "@/entities/Bracket/BracketGame";
import DrawTimeValidationContext from "./DrawTimeValidationContext";
import DrawInfo from "./DrawInfo";
import { DateTimePicker } from "@/shared/ui/date-time-picker";
import SetterButton from "./SetterButton";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getNumSheets } from "@/entities/BracketEvent";
import { getDrawTimes, setDrawTimes } from "@/entities/DrawTime";
import { formatISO, parseISO } from "date-fns";
import InputDate from "@/shared/input/InputDate";
export default function SetStageDrawTimes() {
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(getBracketGamesSchedule);
  const drawTimes = useAppSelector(getDrawTimes);
  const numSheets = useAppSelector(getNumSheets);

  const numDraws = Object.keys(drawTimes).length;

  const [tempDrawTimes, setTempDrawTimes] = useState(
    Object.entries({ ...drawTimes }).reduce((all, [key, value]) => {
      return {
        ...all,
        [key]: value ? formatISO(value) : null,
      };
    }, {})
  );

  function updateDrawTime(newDate: string, index: number) {
    const newDrawTimes = { ...tempDrawTimes };
    newDrawTimes[index] = newDate;
    setTempDrawTimes(newDrawTimes);
  }

  function updateDrawTimes() {
    dispatch(setDrawTimes(tempDrawTimes));
  }

  function getISOTime(date?: string) {
    if (!date) return null;
    return parseISO(date);
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
            <InputDate
              id={`draw-time-${i}`}
              date={tempDrawTimes[i + 1]}
              setDate={(e: Date) => updateDrawTime(e, i + 1)}
              minDate={tempDrawTimes[i]}
              side="left"
              maxDate={tempDrawTimes[i + 2]}
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
