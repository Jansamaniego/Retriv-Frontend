import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../utils/customBaseQuery';

export const overallStatsApi = createApi({
  reducerPath: 'overallStatsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['overallStats'],
  endpoints: (builder) => ({
    getOverallStats: builder.query({
      query(year) {
        return {
          url: `/overall-stats/${year}`,
          credentials: 'include',
        };
      },
      transformResponse: (response) => {
        return response.overallStats;
      },
    }),
  }),
});

export const { useGetOverallStatsQuery } = overallStatsApi;
