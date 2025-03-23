import { client } from "@/shared/api";

export async function reorderStages(tournamentId: string) {
  const { data } = await client
    .from("tournament_stages")
    .select("id, order")
    .eq("tournament_id", tournamentId);
  const orderedStages = data.sort((a, b) => a.order - b.order);
  const updates = orderedStages.map((stage, index) => {
    return {
      id: stage.id,
      order: index,
    };
  });
  await client.from("tournament_stages").upsert(updates);
}
