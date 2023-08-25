import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { logout, setUser } from '../features/userSlice';
import { shopApi } from './shopApi';
import { setShop } from '../features/shopSlice';
import { cartApi } from './cartApi';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';

export const myProfileApi = createApi({
  reducerPath: 'myProfileApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query() {
        return {
          url: '/user/get-me',
          credentials: 'include',
        };
      },
      transformResponse: (data) => {
        return data.user;
      },
      providesTags: (result, error) => {
        console.log(result);
        return result ? [{ type: 'User', id: result.id }] : [];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;

          const { role, defaultShop } = user;

          dispatch(setUser(user));

          await dispatch(
            cartApi.endpoints.getCart.initiate(null, { forceRefetch: true })
          );

          if (defaultShop && role === 'seller') {
            const { data: shop } = await dispatch(
              shopApi.endpoints.getShopById.initiate(defaultShop.id, {
                forceRefetch: true,
              })
            );
            const currentShop = store.getState().shopState.currentShop;
            if (!currentShop) {
              dispatch(setShop(shop));
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateDetails: builder.mutation({
      query(data) {
        return {
          url: '/user/update-details',
          method: 'PATCH',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (data) => {
        return data.user;
      },
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'User', id: result.id }] : [],
    }),
    updateProfileImage: builder.mutation({
      query(data) {
        return {
          url: '/user/update-profile-image',
          method: 'PATCH',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (response) => {
        return response.user;
      },
      invalidatesTags: (result, error) => {
        return result ? [{ type: 'User', id: result.id }] : [];
      },
    }),
    updateDefaultShop: builder.mutation({
      query(shopId) {
        return {
          url: `/user/update-default-shop/${shopId}`,
          method: 'PATCH',
          credentials: 'include',
        };
      },
      transformResponse: (response) => {
        return response.user;
      },
      invalidatesTags: (result, error) =>
        result ? [{ type: 'User', id: result._id }] : [],
    }),
    deleteMyAccount: builder.mutation({
      query() {
        return {
          url: '/user/me',
          method: 'DELETE',
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.user,
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
  useUpdateDetailsMutation,
  useUpdateProfileImageMutation,
  useUpdateDefaultShopMutation,
  useDeleteMyAccountMutation,
} = myProfileApi;
