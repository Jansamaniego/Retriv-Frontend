import { createApi } from '@reduxjs/toolkit/query/react';
import { cartApi } from './cartApi';
import customBaseQuery from '../../utils/customBaseQuery';
import { removeCart } from '../features/cartSlice';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query() {
        return {
          url: '/order',
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.orders.results,
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Order', id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }];
      },
    }),
    getOrderById: builder.query({
      query(orderId) {
        return {
          url: `/order/${orderId}`,
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.order,
      providesTags: (result, error, orderId) =>
        result ? [{ type: 'Order', id: orderId }] : [],
    }),
    createOrder: builder.mutation({
      query({ cartId, ...body }) {
        return {
          url: '/order',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { cartId }) => {
        return [{ type: 'Order', id: 'LIST' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeCart());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateOrderStatus: builder.mutation({
      query({ id, status }) {
        return {
          url: `/order/${id}`,
          method: 'PATCH',
          body: { status },
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { id }) => [
        {
          type: 'Order',
          id,
        },
      ],
    }),
    cancelOrder: builder.mutation({
      query(id) {
        return {
          url: `/order/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
} = orderApi;
