import { client } from "@/shared/api";
export async function removeGamesByIds(gameIds: string[]) {
  if (!gameIds?.length) return;
  await client.from("games").delete().in("id", gameIds);
}
