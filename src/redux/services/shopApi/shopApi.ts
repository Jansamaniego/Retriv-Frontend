import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../utils/customBaseQuery';
import { myProfileApi } from '../myProfileApi/myProfileApi';
import { removeShop, setShop } from '../../features/shopSlice';
import { IShop } from 'src/types';
import {
  ICreateShopResponse,
  ICreateShop,
  IGetShopByIdResponse,
  IGetShopsResponse,
  IUpdateShopResponse,
  IUpdateShop,
  IUpdateShopImageResponse,
  IUpdateShopImage,
  IDeleteShopResponse,
} from './shopApi.types';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Shop'],
  endpoints: (builder) => ({
    getShops: builder.query<IShop[], void>({
      query() {
        return {
          url: '/shop',
        };
      },
      transformResponse: (response: IGetShopsResponse) =>
        response.shops.results,
      providesTags: (results) => {
        return results
          ? [
              ...results.map(({ id }) => ({ type: 'Shop' as const, id })),
              { type: 'Shop', id: 'LIST' },
            ]
          : [{ type: 'Shop', id: 'LIST' }];
      },
    }),
    getShopById: builder.query<IShop, string>({
      query(shopId) {
        console.log(shopId);
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
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     await queryFulfilled;
      //     await dispatch(
      //       myProfileApi.endpoints.getMe.initiate(null, { forceRefetch: true })
      //     );
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
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
    deleteShop: builder.mutation<IDeleteShopResponse, string>({
      query(id) {
        return {
          url: `/shop/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Shop', id: 'LIST' }],
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     await queryFulfilled;

      //     await dispatch(
      //       myProfileApi.endpoints.getMe.initiate(null, { forceRefetch: true })
      //     );

      //     dispatch(removeShop());
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
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
