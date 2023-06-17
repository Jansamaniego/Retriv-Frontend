import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../utils/customBaseQuery';

export const shopStatsApi = createApi({
  reducerPath: 'shopStatsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['shopStats'],
  endpoints: (builder) => ({
    getShopStats: builder.query({
      query({ shopId, year }) {
        return {
          url: `shop/${shopId}/shop-stats/${year}`,
        };
      },
      transformResponse: (response) => {
        return response.shopStats;
      },
    }),
  }),
});

export const { useGetShopStatsQuery } = shopStatsApi;
