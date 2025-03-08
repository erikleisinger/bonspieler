import { createContext } from "react";
import type { BracketConnections } from "@/entities/Bracket/lib";
export const BracketContext = createContext<{
  schedule: { [gameId: string]: number };
  connections: BracketConnections;
  scrollToBracket: (bracketIndex: number) => void;
  scrollToGame: (gameId: string) => void;
}>({
  schedule: {},
  connections: {},
  scrollToBracket: () => {},
  scrollToGame: () => {},
});
