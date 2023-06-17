import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../utils/customBaseQuery';

export const productStatsApi = createApi({
  reducerPath: 'productStatsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['productStats'],
  endpoints: (builder) => ({
    getProductStats: builder.query({
      query({ shopId, productId, year }) {
        return {
          url: `/shop/${shopId}/product/${productId}/product-stats/${year}`,
        };
      },
      transformResponse: (response) => {
        return response.productStats;
      },
    }),
  }),
});

export const { useGetProductStatsQuery } = productStatsApi;
