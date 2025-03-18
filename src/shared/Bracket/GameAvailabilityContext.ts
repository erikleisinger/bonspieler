import { createContext } from "react";

export const GameAvailabilityContext = createContext<{
  availableGameIds: string[];
}>({
  availableGameIds: [],
});
