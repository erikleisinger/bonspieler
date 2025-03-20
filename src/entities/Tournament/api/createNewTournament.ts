import { client } from "@/shared/api";
import { BLANK_TOURNAMENT } from "../lib/constants/blank-tournament";
export async function createNewTournament() {
  const { data } = await client
    .from("tournaments")
    .insert(BLANK_TOURNAMENT)
    .select("*")
    .single();
  return data;
}
