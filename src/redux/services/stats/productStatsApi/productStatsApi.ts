import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../../utils/customBaseQuery';
import {
  IGetProductStats,
  IGetProductStatsResponse,
  IProductStats,
} from './productStatsApi.types';

export const productStatsApi = createApi({
  reducerPath: 'productStatsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['productStats'],
  endpoints: (builder) => ({
    getProductStats: builder.query<IProductStats, IGetProductStats>({
      query({ shopId, productId, year }) {
        return {
          url: `/shop/${shopId}/product/${productId}/product-stats/${year}`,
        };
      },
      transformResponse: (response: IGetProductStatsResponse) => {
        return response.productStats;
      },
    }),
  }),
});

export const { useGetProductStatsQuery } = productStatsApi;
