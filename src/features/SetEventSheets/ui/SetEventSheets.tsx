import { useState } from "react";
import NumberSheetsSelect from "@/shared/ui/number-sheets-select";
import CalculateButton from "./CalculateButton";
export default function SetEventSheets({
  numSheets,
  setNumSheets,
}: {
  numSheets: number;
  setNumSheets: (newNum: number) => void;
}) {
  const [initialNumSheets, setInitialNumSheets] = useState(numSheets);
  return (
    <>
      <NumberSheetsSelect numSheets={numSheets} setNumSheets={setNumSheets}>
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
