import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { myProfileApi } from './myProfileApi';
import { removeShop, setShop } from '../features/shopSlice';

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
      providesTags: (result, error, shopId) => {
        return result ? [{ type: 'Shop', id: shopId }] : [];
      },
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
    updateShopImage: builder.mutation({
      query(formData) {
        return {
          url: `/shop/${formData.get('id')}/shop-image`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, formData) => {
        console.log(formData.get('id'));
        return [
          {
            type: 'Shop',
            id: formData.get('id'),
          },
        ];
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
    deleteShop: builder.mutation({
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
    updateDefaultShop: builder.mutation({
      query(id) {
        return {
          url: `/shop/${id}/set-default-shop`,
          method: 'PATCH',
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          await dispatch(
            myProfileApi.endpoints.getMe.initiate(null, { forceRefetch: true })
          );
        } catch (error) {
          console.log(error);
        }
      },
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
