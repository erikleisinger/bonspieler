import { client } from "@/shared/api";
import { Tournament } from "@/shared/types/Tournament";

export async function getTournamentById(id: string): Promise<Tournament> {
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
