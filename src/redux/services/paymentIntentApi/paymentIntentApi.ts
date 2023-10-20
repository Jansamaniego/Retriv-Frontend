import { createApi } from '@reduxjs/toolkit/query/react';

import customBaseQuery from 'utils/customBaseQuery';
import { ICreatePaymentIntentResponse } from 'redux/services/paymentIntentApi/paymentIntentApi.types';

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
  }),
});

export const { useCreatePaymentIntentMutation } = paymentIntentApi;
