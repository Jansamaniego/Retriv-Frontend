import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../utils/customBaseQuery';

export const shopRatingsApi = createApi({
  reducerPath: 'shopRatingsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['shopRatings'],
  endpoints: (builder) => ({
    getShopRatings: builder.query({
      query(shopId) {
        return {
          url: `shop/${shopId}/shop-ratings`,
        };
      },
      transformResponse: (response) => {
        return response.shopRatings;
      },
    }),
  }),
});

export const { useGetShopRatingsQuery } = shopRatingsApi;
