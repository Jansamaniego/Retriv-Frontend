import { createApi } from '@reduxjs/toolkit/query/react';

import customBaseQuery from 'utils/customBaseQuery';
import {
  IGetShopStats,
  IGetshopStatsResponse,
  IShopStats,
} from 'redux/services/stats/shopStatsApi/shopStatsApi.types';

export const shopStatsApi = createApi({
  reducerPath: 'shopStatsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['shopStats'],
  endpoints: (builder) => ({
    getShopStats: builder.query<IShopStats, IGetShopStats>({
      query({ shopId, year }) {
        return {
          url: `shop/${shopId}/shop-stats/${year}`,
        };
      },
      transformResponse: (response: IGetshopStatsResponse) => {
        return response.shopStats;
      },
    }),
  }),
});

export const { useGetShopStatsQuery } = shopStatsApi;
