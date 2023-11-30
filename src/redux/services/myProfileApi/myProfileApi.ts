import { createApi } from '@reduxjs/toolkit/query/react';

import customBaseQuery from 'utils/customBaseQuery';
import { IUser } from 'types';
import {
  IGetMeResponse,
  IUpdateDetailsResponse,
  IUpdateDetails,
  IUpdateProfileImageResponse,
  IUpdateProfileImage,
  IUpdateDefaultShopResponse,
  IDeleteMyAccountResponse,
} from 'redux/services/myProfileApi/myProfileApi.types';
import { cartApi } from 'redux/services/cartApi/cartApi';
import { shopApi } from 'redux/services/shopApi/shopApi';
import { logout, setUser } from 'redux/features/userSlice';
import { setShop } from 'redux/features/shopSlice';

export const myProfileApi = createApi({
  reducerPath: 'myProfileApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: '/user/get-me',
          credentials: 'include',
        };
      },
      transformResponse: (data: IGetMeResponse) => {
        return data.user;
      },
      providesTags: (result, error) => {
        console.log(result);
        return result ? [{ type: 'User', id: result.id }] : [];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: user } = await queryFulfilled;

          const { role, defaultShop } = user;

          dispatch(setUser(user));

          await dispatch(
            cartApi.endpoints.getCart.initiate(undefined, {
              forceRefetch: true,
            })
          );

          if (defaultShop && role === 'seller') {
            if (typeof defaultShop === 'string') {
              const { data: shop } = await dispatch(
                shopApi.endpoints.getShopById.initiate(defaultShop, {
                  forceRefetch: true,
                })
              );
              console.log(shop);
              if (!shop) return;
              dispatch(setShop(shop));
            } else if (typeof defaultShop !== 'string') {
              const { data: shop } = await dispatch(
                shopApi.endpoints.getShopById.initiate(defaultShop._id, {
                  forceRefetch: true,
                })
              );
              console.log(shop);
              if (!shop) return;
              dispatch(setShop(shop));
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateDetails: builder.mutation<IUser, IUpdateDetails>({
      query(data) {
        return {
          url: '/user/update-details',
          method: 'PATCH',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (data: IUpdateDetailsResponse) => {
        return data.user;
      },
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'User', id: result.id }] : [],
    }),
    updateProfileImage: builder.mutation<IUser, IUpdateProfileImage>({
      query(data) {
        return {
          url: '/user/update-profile-image',
          method: 'PATCH',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (response: IUpdateProfileImageResponse) => {
        return response.user;
      },
      invalidatesTags: (result, error) => {
        return result ? [{ type: 'User', id: result.id }] : [];
      },
    }),
    updateDefaultShop: builder.mutation<IUser, string>({
      query(shopId) {
        return {
          url: `/user/update-default-shop/${shopId}`,
          method: 'PATCH',
          credentials: 'include',
        };
      },
      transformResponse: (response: IUpdateDefaultShopResponse) => {
        return response.user;
      },
      invalidatesTags: (result, error) =>
        result ? [{ type: 'User', id: result._id }] : [],
    }),
    deleteMyAccount: builder.mutation<IUser, void>({
      query() {
        return {
          url: '/user/me',
          method: 'DELETE',
          credentials: 'include',
        };
      },
      transformResponse: (response: IDeleteMyAccountResponse) => response.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(logout());
      },
      invalidatesTags: (result) =>
        result ? [{ type: 'User', id: result._id }] : [],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateDetailsMutation,
  useUpdateProfileImageMutation,
  useUpdateDefaultShopMutation,
  useDeleteMyAccountMutation,
} = myProfileApi;
