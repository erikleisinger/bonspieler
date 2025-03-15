import type { Client } from "./index";
export async function updateTournament(
  {
    id,
    updates,
  }: {
    id: string;
    updates: {
      name?: string;
      schema?: string;
      idk: string;
    };
  },
  client: Client
) {
  const { data, error } = await client
    .from("tournament_schema")
    .update(updates)
    .eq("id", id);
}
