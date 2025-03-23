import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export type {
  Database,
  Json,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "./database.types";

export * from "./model";
export * from "./queries";
export * from "./mutations";
