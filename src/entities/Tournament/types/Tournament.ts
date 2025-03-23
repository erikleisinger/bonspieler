import { Nullable } from "@/shared/types";
export interface Tournament {
  id?: string;
  name: string;
  start_date: Nullable<string>;
  end_date: Nullable<string>;
  num_sheets: Nullable<number>;
}
