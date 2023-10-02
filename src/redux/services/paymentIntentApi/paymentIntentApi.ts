import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../utils/customBaseQuery';
import { ICreatePaymentIntentResponse } from './paymentIntentApi.types';

export const paymentIntentApi = createApi({
  reducerPath: 'paymentIntentApi',
  baseQuery: customBaseQuery,
  tagTypes: ['paymentIntent'],
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<ICreatePaymentIntentResponse, number>(
      {
        query(totalPrice) {
          return {
            url: `/payment-intent`,
            method: 'POST',
            body: { totalPrice },
            credentials: 'include',
          };
        },
      }
    ),
    // confirmPaymentIntent: builder.mutation({
    //   query(paymentIntentId) {
    //     return {
    //       url: `/payment-intent/${paymentIntentId}`,
    //       credentials: 'include',
    //     };
    //   },
    // }),
    // getPaymentIntents: builder.query({
    //   query() {
    //     return {
    //       url: '/payment-intent',
    //       credentials: 'include',
    //     };
    //   },
    // }),
    // getPaymentIntent: builder.query({
    //   query(paymentIntentId) {
    //     return {
    //       url: `/payment-intent/${paymentIntentId}`,
    //       credentials: 'include',
    //     };
    //   },
    // }),
    // cancelPaymentIntents: builder.mutation({
    //   query() {
    //     return {
    //       url: '/payment-intent/cancel-all-payments',
    //       method: 'PATCH',
    //       credentials: 'include',
    //     };
    //   },
    // }),
    // cancelPaymentIntent: builder.mutation({
    //   query(paymentIntentId) {
    //     return {
    //       url: `/payment-intent/${paymentIntentId}`,
    //       method: 'PATCH',
    //       credentials: 'include',
    //     };
    //   },
    // }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  // useConfirmPaymentIntentMutation,
  // useGetPaymentIntentsQuery,
  // useGetPaymentIntentQuery,
  // useCancelPaymentIntentsMutation,
  // useCancelPaymentIntentMutation,
} = paymentIntentApi;
