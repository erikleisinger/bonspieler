export async function addTournament(
  {
    name,
    schema,
  }: {
    name: string;
    schema: string;
  },
  client
) {
  const { data } = await client
    .from("tournament_schema")
    .insert({ name, schema });
  console.log(data);
}
