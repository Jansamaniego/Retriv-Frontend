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
        };
      },
      transformResponse: (response) => response.orders,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order', id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [],
    }),
    getOrderById: builder.query({
      query(orderId) {
        return {
          url: `/order/${orderId}`,
        };
      },
      transformResponse: (response) => response.order,
      providesTags: (result, error, { orderId }) =>
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
      query(body) {
        return {
          url: `/order/${body.id}`,
          method: 'PATCH',
          body,
          credentals: 'include',
        };
      },
      invalidatesTags: (result, error, { body }) => [
        {
          type: 'Order',
          id: body.id,
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
