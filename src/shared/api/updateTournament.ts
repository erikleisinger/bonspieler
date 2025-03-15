export async function updateTournament(
  {
    id,
    updates,
  }: {
    id: string;
    updates: any;
  },
  client
) {
  const { data } = await client
    .from("tournament_schema")
    .update(updates)
    .eq("id", id);
  console.log(data);
}
