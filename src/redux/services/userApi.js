import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { setUser } from '../features/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
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
          dispatch(setUser(user));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;
