import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../../utils/customBaseQuery';
import {
  IGetOverallStatsResponse,
  IOverallStats,
} from './overallStatsApi.types';

export const overallStatsApi = createApi({
  reducerPath: 'overallStatsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['overallStats'],
  endpoints: (builder) => ({
    getOverallStats: builder.query<IOverallStats, number>({
      query(year) {
        return {
          url: `/overall-stats/${year}`,
          credentials: 'include',
        };
      },
      transformResponse: (response: IGetOverallStatsResponse) => {
        return response.overallStats;
      },
    }),
  }),
});

export const { useGetOverallStatsQuery } = overallStatsApi;
