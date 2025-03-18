import { client, type TablesUpdate } from "@/shared/api";
export async function updateTournament({
  id,
  updates,
}: {
  id: number;
  updates: TablesUpdate<"tournaments">;
}) {
  const { data, error } = await client
    .from("tournaments")
    .update(updates)
    .eq("id", id);

  return { data, error };
}
