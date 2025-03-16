import { client, type Tables } from "@/shared/api";
export async function getTournamentById(
  id: number
): Promise<Tables<"tournament_schema">> {
  const { data } = await client
    .from("tournament_schema")
    .select("*")
    .eq("id", id)
    .single();
  const { schema, created_at, ...rest } = data;
  const parsedSchema = JSON.parse(schema);
  return {
    ...parsedSchema,
    ...rest,
  };
}
