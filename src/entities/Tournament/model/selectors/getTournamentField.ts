import { Tournament } from "../../types";
import type { RootState } from "@/lib/store";

export function getTournamentField<K extends keyof Tournament>(field: K) {
  return (state: RootState): Tournament[K] | null => {
    if (!state.tournament?.tournament) return null;
    return state.tournament.tournament[field];
  };
}
