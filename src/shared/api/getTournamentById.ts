export async function getTournamentById(id: string, client) {
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
