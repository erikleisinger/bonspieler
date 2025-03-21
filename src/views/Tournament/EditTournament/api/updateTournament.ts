import { client, type TablesUpdate } from "@/shared/api";
export async function updateTournament({
  id,
  name,
  start_date,
  end_date,
}: {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
}) {
  const { data, error } = await client
    .from("tournaments")
    .update({ name, start_date, end_date })
    .eq("id", id);

  return { data, error };
}
