import { createContext } from "react";

export const DrawTimeValidationContext = createContext<{
  warnings: { [drawNumber: number]: string[] };
}>({
  warnings: {},
});
