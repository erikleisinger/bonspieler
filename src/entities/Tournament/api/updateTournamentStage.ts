import { client } from "@/shared/api";

export async function updateTournamentStage(stageId, updates) {
  const { data } = await client
    .from("tournament_stages")
    .update(updates)
    .eq("id", stageId)
    .select("*");
  return data;
}
