import { createContext } from "react";

export const StageContext = createContext<{
  stageId: string;
}>({
  stageId: "",
});
