import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { setUser } from '../features/userSlice';

export const myProfileApi = createApi({
  reducerPath: 'myProfileApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query() {
        return {
          url: 'user/get-me',
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
          console.log(user);
          dispatch(setUser(user));
        } catch (error) {}
      },
    }),
    updateDetails: builder.mutation({
      query(data) {
        return {
          url: 'user/update-details',
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
          url: 'user/update-profile-image',
          method: 'PATCH',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (data) => {
        return data.user;
      },
      invalidatesTags: (result, error) =>
        result ? [{ type: 'User', id: result.id }] : [],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateDetailsMutation,
  useUpdateProfileImageMutation,
} = myProfileApi;
