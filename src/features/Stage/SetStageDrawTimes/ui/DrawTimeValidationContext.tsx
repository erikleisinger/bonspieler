import type { DrawTimeWarningsProps } from "../lib/types/DrawTimeWarningsProps";
import { useMemo } from "react";
import { DrawTimeValidationContext as DrawTimeValidationContextDefinition } from "../lib/DrawTimeValidationContext";
import { getDrawTimeWarnings } from "../lib";
export default function DrawTimeValidationContext({
  numDraws,
  numSheets,
  schedule,
  drawTimes,
  children,
}: DrawTimeWarningsProps & { children: React.ReactNode }) {
  const warnings = useMemo(() => {
    return getDrawTimeWarnings({
      drawTimes: drawTimes,
      numDraws,
      schedule,
      numSheets: numSheets,
    });
  }, [drawTimes, schedule, numSheets]);
  return (
    <DrawTimeValidationContextDefinition.Provider
      value={{
        warnings,
      }}
    >
      {children}
    </DrawTimeValidationContextDefinition.Provider>
  );
}
