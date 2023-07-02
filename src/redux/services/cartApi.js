import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query() {
        return {
          url: `/cart`,
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.cart,
      providesTags: (result) =>
        result ? [{ type: 'Cart', id: result.id }] : [],
    }),
    addProductToCart: builder.mutation({
      query(body) {
        return {
          url: '/cart',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.cart,
      invalidatesTags: (result) =>
        result ? [{ type: 'Cart', id: result.id }] : [],
    }),
    deleteCart: builder.mutation({}),
  }),
});

export const { useGetCartQuery, useAddProductToCartMutation } = cartApi;
