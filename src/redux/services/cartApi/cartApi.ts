import { createApi } from '@reduxjs/toolkit/query/react';

import customBaseQuery from 'utils/customBaseQuery';
import { ICart } from 'types';
import {
  IAddProductToCart,
  ICartResponse,
  IRemoveCartItem,
} from 'redux/services/cartApi/cartApi.types';
import { removeCart, setCart } from 'redux/features/cartSlice';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<ICart, void>({
      query() {
        return {
          url: `/cart`,
          credentials: 'include',
        };
      },
      transformResponse: (response: ICartResponse) => response.cart,
      providesTags: (result) => [{ type: 'Cart', id: 'myCart' }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: cart } = await queryFulfilled;
          dispatch(setCart(cart));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteCart: builder.mutation<ICartResponse, void>({
      query() {
        return {
          url: `/cart`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Cart', id: 'myCart' }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeCart());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addProductToCart: builder.mutation<ICart, IAddProductToCart>({
      query(body) {
        return {
          url: '/cart',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      transformResponse: (response: ICartResponse) => response.cart,
      invalidatesTags: (result) => {
        return result ? [{ type: 'Cart', id: 'myCart' }] : [];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: cart } = await queryFulfilled;
          // console.log(cart);
          // dispatch(setCart(cart));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    incrementCartItemQuantity: builder.mutation<ICart, string>({
      query(productId) {
        return {
          url: `/cart/increment-product/${productId}`,
          method: 'PATCH',
          credentials: 'include',
        };
      },
      transformResponse: (response: ICartResponse) => response.cart,
      invalidatesTags: (result, error) =>
        result ? [{ type: 'Cart', id: 'myCart' }] : [],
    }),
    decrementCartItemQuantity: builder.mutation<ICart, string>({
      query(productId) {
        return {
          url: `/cart/decrement-product/${productId}`,
          method: 'PATCH',
          credentials: 'include',
        };
      },
      transformResponse: (response: ICartResponse) => response.cart,
      invalidatesTags: (result, error) =>
        result ? [{ type: 'Cart', id: 'myCart' }] : [],
    }),
    removeCartItem: builder.mutation<ICart, IRemoveCartItem>({
      query({ productId, cartItemIndex }) {
        return {
          url: `/cart/remove-product/${productId}`,
          method: 'DELETE',
          body: { cartItemIndex },
          credentials: 'include',
        };
      },
      transformResponse: (response: ICartResponse) => response.cart,
      invalidatesTags: (result) =>
        result ? [{ type: 'Cart', id: 'myCart' }] : [],
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
