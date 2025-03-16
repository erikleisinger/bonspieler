import { client, type Tables } from "@/shared/api";
export async function getTournamentById(
  id: number
): Promise<Tables<"tournaments">> {
  const { data } = await client
    .from("tournaments")
    .select("*")
    .eq("id", id)
    .single();
  const { schema, created_at, ...rest } = data;

  return {
    ...schema,
    ...rest,
  };
}
