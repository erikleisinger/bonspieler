import { useState } from "react";
import NumberSheetsSelect from "@/shared/ui/number-sheets-select";
import CalculateButton from "./CalculateButton";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getBracketEventNumSheets,
  setNumSheets,
} from "@/entities/BracketEvent";
export default function SetEventSheets({}: {}) {
  const dispatch = useAppDispatch();
  const numSheets = useAppSelector(getBracketEventNumSheets);
  const [initialNumSheets, setInitialNumSheets] = useState(numSheets);
  return (
    <>
      <NumberSheetsSelect
        numSheets={numSheets}
        setNumSheets={(n) => dispatch(setNumSheets(n))}
      >
        Sheets
      </NumberSheetsSelect>
      <footer className="mt-4 flex justify-center">
        <CalculateButton
          className="w-[300px]"
          numSheets={numSheets}
          onCalculate={() => setInitialNumSheets(numSheets)}
          active={initialNumSheets !== numSheets}
        />
      </footer>
    </>
  );
}
