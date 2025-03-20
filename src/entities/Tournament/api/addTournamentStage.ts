import { client } from "@/shared/api";
import type { TournamentStageType } from "../types";
export async function addTournamentStage(
  tournamentId: string,
  stageType: TournamentStageType,
  order: number
) {
  const { data } = await client
    .from("tournament_stages")
    .insert({ type: stageType, tournament_id: tournamentId, order })
    .select("*")
    .single();
  return data;
}
