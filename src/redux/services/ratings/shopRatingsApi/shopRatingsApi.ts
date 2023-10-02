import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../../utils/customBaseQuery';
import { IGetShopRatingsResponse, IShopRatings } from './shopRatingsApi.types';

export const shopRatingsApi = createApi({
  reducerPath: 'shopRatingsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['shopRatings'],
  endpoints: (builder) => ({
    getShopRatings: builder.query<IShopRatings, string>({
      query(shopId) {
        return {
          url: `shop/${shopId}/shop-ratings`,
        };
      },
      transformResponse: (response: IGetShopRatingsResponse) => {
        return response.shopRatings;
      },
    }),
  }),
});

export const { useGetShopRatingsQuery } = shopRatingsApi;
