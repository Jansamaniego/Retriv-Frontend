import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { myProfileApi } from './myProfileApi';
import { setShop } from '../features/shopSlice';

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
      providesTags: ({ results }) => {
        console.log(results);
        return results
          ? [
              ...results.map(({ id }) => ({ type: 'Shop', id })),
              { type: 'Shop', id: 'LIST' },
            ]
          : [{ type: 'Shop', id: 'LIST' }];
      },
    }),
    getShopById: builder.query({
      query(shopId) {
        console.log(shopId);
        return {
          url: `/shop/${shopId}`,
        };
      },
      transformResponse: (response) => response.shop,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: shop } = await queryFulfilled;

          dispatch(setShop(shop));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: (result, error, shopId) =>
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
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { id }) => [
        {
          type: 'Shop',
          id,
        },
      ],
    }),
    updateShopImage: builder.mutation({
      query(formData) {
        return {
          url: `/shop/${formData.get('id')}/shop-image`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, formData) => [
        {
          type: 'Shop',
          id: formData.get('id'),
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
