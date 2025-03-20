import { client } from "@/shared/api";

export async function fetchDrawTimesForStage(stageId: string) {
  const { data } = await client
    .from("draws")
    .select("*")
    .eq("tournament_stage_id", stageId);
  return data;
}
