import type { Tables } from "@/shared/api";
import { BracketGameType } from "@/entities/Bracket";
export function formatGameForDisplay(game: Tables<"games">): BracketGameType {
  const { id, group_number, round_number, is_seed } = game;

  return {
    id: id,
    bracketNumber: group_number || 0,
    roundNumber: round_number || 0,
    isSeed: is_seed || false,
  };
}
