import { createContext } from "react";
import type { BracketConnections } from "@/entities/Bracket/lib";
export const BracketContext = createContext<{
  schedule: { [gameId: string]: number };
  connections: BracketConnections;
}>({
  schedule: {},
  connections: {},
});
