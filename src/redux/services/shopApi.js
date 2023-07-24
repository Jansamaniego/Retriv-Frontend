import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { myProfileApi } from './myProfileApi';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Shop'],
  endpoints: (builder) => ({
    getShops: builder.query({
      query() {
        return {
          url: '/shop',
        };
      },
      transformResponse: (response) => response.shops,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Shop', id })),
              { type: 'Shop', id: 'LIST' },
            ]
          : [],
    }),
    getShopById: builder.query({
      query(shopId) {
        return {
          url: `/shop/${shopId}`,
        };
      },
      transformResponse: (response) => response.shop,
      providesTags: (result, error, { shopId }) =>
        result ? [{ type: 'Shop', id: shopId }] : [],
    }),
    createShop: builder.mutation({
      query(body) {
        return {
          url: '/shop',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Shop', id: 'LIST' }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(myProfileApi.endpoints.getMe.initiate());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateShop: builder.mutation({
      query(body) {
        return {
          url: `/shop/${body.id}`,
          method: 'PATCH',
          body,
          credentals: 'include',
        };
      },
      invalidatesTags: (result, error, { body }) => [
        {
          type: 'Shop',
          id: body.id,
        },
      ],
    }),
    updateShopImage: builder.mutation({
      query(body) {
        return {
          url: `/shop/${body.id}/shop-image`,
          method: 'PATCH',
          body,
          credentals: 'include',
        };
      },
      invalidatesTags: (result, error, { body }) => [
        {
          type: 'Shop',
          id: body.id,
        },
      ],
    }),
    deleteShop: builder.mutation({
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
  useCreateShopMutation,
  useUpdateShopMutation,
  useUpdateShopImageMutation,
  useDeleteShopMutation,
} = shopApi;
