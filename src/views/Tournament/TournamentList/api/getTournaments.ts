import { client } from "@/shared/api";
import type { Tournament } from "@/entities/Tournament";
export async function getTournaments(): Promise<Tournament[]> {
  const { data } = await client.from("tournaments").select("*");
  return data?.map((t) => {
    const { schema, created_at, ...rest } = t;
    return {
      ...schema,
      ...rest,
    };
  });
}
