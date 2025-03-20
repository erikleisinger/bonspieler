import { client, type Tables } from "@/shared/api";

export async function saveDrawTimes(
  drawTimes: Partial<Tables<"draws">>[],
  stageId: string
) {
  await client.from("draws").delete().eq("tournament_stage_id", stageId);
  const { data } = await client.from("draws").insert(drawTimes).select("*");
  return data;
}
