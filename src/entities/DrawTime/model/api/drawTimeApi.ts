import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchDrawTimesForStage } from "./fetchDrawTimesForStage";

export const drawTimesApi = createApi({
  reducerPath: "drawTimesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["DrawTimes"],
  endpoints: (build) => ({
    fetchDrawTimesForStage: build.query({
      queryFn: async (stageId: string) => {
        const drawTimes = await fetchDrawTimesForStage(stageId);
        const formatted = drawTimes?.reduce((all, current) => {
          const { draw_number, time } = current;
          return {
            ...all,
            [draw_number]: time,
          };
        }, {});
        return { data: formatted };
      },
      providesTags: (result, _, stageId) => {
        return [{ type: "DrawTimes", id: stageId }];
      },
    }),
  }),
});

export const { useFetchDrawTimesForStageQuery } = drawTimesApi;
