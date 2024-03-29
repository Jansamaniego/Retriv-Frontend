import { createApi } from '@reduxjs/toolkit/query/react';

import { IResponse } from 'types';
import {
  ICreateShopResponse,
  ICreateShop,
  IGetShopByIdResponse,
  IGetShopsResponse,
  IUpdateShopResponse,
  IUpdateShop,
  IUpdateShopImageResponse,
  IUpdateShopImage,
  IShopWithOwnerPickValues,
  IGetShopsTransformedResponse,
} from 'redux/services/shopApi/shopApi.types';
import customBaseQuery from 'utils/customBaseQuery';
import { myProfileApi } from '../myProfileApi/myProfileApi';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Shop'],
  endpoints: (builder) => ({
    getShops: builder.query<IGetShopsTransformedResponse, string | void>({
      query() {
        return {
          url: '/shop',
        };
      },
      transformResponse: (response: IGetShopsResponse) => response.shops,
      providesTags: (results) => {
        return results?.results
          ? [
              ...results?.results?.map(({ id }) => ({
                type: 'Shop' as const,
                id,
              })),
              { type: 'Shop', id: 'LIST' },
            ]
          : [{ type: 'Shop', id: 'LIST' }];
      },
    }),
    getShopById: builder.query<IShopWithOwnerPickValues, string>({
      query(shopId) {
        return {
          url: `/shop/${shopId}`,
        };
      },
      transformResponse: (response: IGetShopByIdResponse) => response.shop,
      providesTags: (result, error, shopId) => {
        return result ? [{ type: 'Shop', id: shopId }] : [];
      },
    }),
    createShop: builder.mutation<ICreateShopResponse, ICreateShop>({
      query(body) {
        return {
          url: '/shop',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Shop', id: 'LIST' }],
    }),
    updateShop: builder.mutation<IUpdateShopResponse, IUpdateShop>({
      query(body) {
        return {
          url: `/shop/${body.id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { id }) => [
        {
          type: 'Shop',
          id,
        },
      ],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            myProfileApi.endpoints.getMe.initiate(null, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateShopImage: builder.mutation<
      IUpdateShopImageResponse,
      IUpdateShopImage
    >({
      query(formData) {
        return {
          url: `/shop/${formData.get('id')}/shop-image`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, formData) => {
        const id = formData.get('id');
        return typeof id === 'string'
          ? [
              {
                type: 'Shop' as const,
                id,
              },
            ]
          : [];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            myProfileApi.endpoints.getMe.initiate(null, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteShop: builder.mutation<IResponse, string>({
      query(id) {
        return {
          url: `/shop/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Shop', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetShopByIdQuery,
  useLazyGetShopByIdQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useUpdateShopImageMutation,
  useDeleteShopMutation,
} = shopApi;
