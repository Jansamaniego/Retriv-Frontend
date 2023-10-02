import { createApi } from '@reduxjs/toolkit/query/react';
import { cartApi } from '../cartApi/cartApi';
import customBaseQuery from '../../../utils/customBaseQuery';
import { removeCart } from '../../features/cartSlice';
import { IOrder } from 'src/types';
import {
  ICreateOrder,
  IGetOrdersResponse,
  IOrderResponse,
  IUpdateOrderStatus,
} from './orderApi.types';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query() {
        return {
          url: '/order',
          credentials: 'include',
        };
      },
      transformResponse: (response: IGetOrdersResponse) =>
        response.orders.results,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),
    getOrderById: builder.query<IOrder, string>({
      query(orderId) {
        return {
          url: `/order/${orderId}`,
          credentials: 'include',
        };
      },
      transformResponse: (response: IOrderResponse) => response.order,
      providesTags: (result, error, orderId) =>
        result ? [{ type: 'Order', id: orderId }] : [],
    }),
    createOrder: builder.mutation<IOrderResponse, ICreateOrder>({
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
    updateOrderStatus: builder.mutation<IOrderResponse, IUpdateOrderStatus>({
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
    cancelOrder: builder.mutation<IOrderResponse, string>({
      query(id) {
        return {
          url: `/order/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, id) => [
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
