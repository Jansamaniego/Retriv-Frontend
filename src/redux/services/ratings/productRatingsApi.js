import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../utils/customBaseQuery';

export const productRatingsApi = createApi({
  reducerPath: 'productRatingsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['ProductRatings'],
  endpoints: (builder) => ({
    getProductRatings: builder.query({
      query({ shopId, productId }) {
        return {
          url: `shop/${shopId}/product/${productId}/product-ratings`,
        };
      },
      transformResponse: (response) => {
        return response?.productRatings;
      },
    }),
  }),
});

export const { useGetProductRatingsQuery } = productRatingsApi;
