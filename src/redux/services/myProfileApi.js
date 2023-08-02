import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { setUser } from '../features/userSlice';
import { shopApi } from './shopApi';

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
      providesTags: (result, error) =>
        result ? [{ type: 'User', id: result.id }] : [],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;

          const { role, defaultShop } = user;

          console.log(user);

          dispatch(setUser(user));

          console.log(role, defaultShop);

          if (defaultShop && role === 'seller') {
            await dispatch(
              shopApi.endpoints.getShopById.initiate(defaultShop.id, {
                forceRefetch: true,
              })
            );
          }
        } catch (error) {}
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
        };
      },
      transformResponse: (response) => response.user,
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
