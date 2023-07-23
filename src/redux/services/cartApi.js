import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { setCart } from '../features/cartSlice';

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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: cart } = await queryFulfilled;
          await dispatch(setCart(cart));
        } catch (error) {
          console.log(error);
        }
      },
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
    deleteCart: builder.mutation({
      query(productId) {
        return {
          url: `/cart/${productId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
    }),
    incrementCartItemQuantity: builder.mutation({
      query(productId) {
        return {};
      },
    }),
    decrementCartItemQuantity: builder.mutation({
      query(productId) {
        return {};
      },
    }),
  }),
});

export const { useGetCartQuery, useAddProductToCartMutation } = cartApi;
