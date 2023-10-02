import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../../utils/customBaseQuery';
import {
  IGetProductRatings,
  IGetProductRatingsResponse,
  IProductRatings,
} from './productRatingsApi.types';

export const productRatingsApi = createApi({
  reducerPath: 'productRatingsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['ProductRatings'],
  endpoints: (builder) => ({
    getProductRatings: builder.query<IProductRatings, IGetProductRatings>({
      query({ shopId, productId }) {
        return {
          url: `shop/${shopId}/product/${productId}/product-ratings`,
        };
      },
      transformResponse: (response: IGetProductRatingsResponse) => {
        return response.productRatings;
      },
    }),
  }),
});

export const { useGetProductRatingsQuery } = productRatingsApi;
