import { client } from "@/shared/api";
export async function deleteTournamentStage(stageId: string) {
  const { error } = await client
    .from("tournament_stages")
    .delete()
    .eq("id", stageId);
  if (!error) return stageId;
  return null;
}
