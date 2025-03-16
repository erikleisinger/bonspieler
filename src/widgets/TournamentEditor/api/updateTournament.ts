import { client, type TablesUpdate } from "@/shared/api";
export async function updateTournament({
  id,
  updates,
}: {
  id: number;
  updates: TablesUpdate<"tournament_schema">;
}) {
  const { data, error } = await client
    .from("tournament_schema")
    .update(updates)
    .eq("id", id);

  return { data, error };
}
