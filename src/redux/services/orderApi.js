import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';

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
          : [];
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
      query(body) {
        return {
          url: '/order',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
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
      query(body) {
        return {
          url: `/order/${body.id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
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
