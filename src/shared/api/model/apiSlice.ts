import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { KEYS } from "../keys";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: KEYS,
  endpoints: () => ({}),
});
