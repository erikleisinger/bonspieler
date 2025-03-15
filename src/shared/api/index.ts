import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./supabase";
import { getTournamentById } from "./getTournamentById";
import { updateTournament } from "./updateTournament";
import { addTournament } from "./addTournament";

export type Client = SupabaseClient<Database, "public">;

const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const api = {
  add: {
    tournament: (params) => addTournament(params, client),
  },
  get: {
    tournament: {
      byId: (id: string) => getTournamentById(id, client),
    },
  },
  update: {
    tournament: (params) => updateTournament(params, client),
  },
};
