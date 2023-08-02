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
        result ? [{ type: 'Cart', id: result._id }] : [],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: cart } = await queryFulfilled;
          await dispatch(setCart(cart));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteCart: builder.mutation({
      query() {
        return {
          url: `/cart`,
          method: 'DELETE',
          credentials: 'include',
        };
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
    incrementCartItemQuantity: builder.mutation({
      query(productId) {
        return {
          url: `/cart/increment-product/${productId}`,
          method: 'PATCH',
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.cart,
      invalidatesTags: (result, error) =>
        result ? [{ type: 'Cart', id: result._id }] : [],
    }),
    decrementCartItemQuantity: builder.mutation({
      query(productId) {
        return {
          url: `/cart/decrement-product/${productId}`,
          method: 'PATCH',
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.cart,
      invalidatesTags: (result, error) =>
        result ? [{ type: 'Cart', id: result._id }] : [],
    }),
    removeCartItem: builder.mutation({
      query(productId) {
        return {
          url: `/cart/remove-product/${productId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.cart,
      invalidatesTags: (result) =>
        result ? [{ type: 'Cart', id: result._id }] : [],
    }),
  }),
});

export const {
  useGetCartQuery,
  useDeleteCartMutation,
  useAddProductToCartMutation,
  useIncrementCartItemQuantityMutation,
  useDecrementCartItemQuantityMutation,
  useRemoveCartItemMutation,
} = cartApi;
