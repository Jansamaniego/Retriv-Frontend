import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query() {
        return {
          url: '/user',
        };
      },
      transformResponse: (response) => {
        return response.users;
      },
      providesTags: (result) => {
        console.log(result);
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'User', id })),
              { type: 'User', id: 'LIST' },
            ]
          : [];
      },
    }),
    getUserById: builder.query({
      query(userId) {
        return {
          url: `/user/${userId}`,
        };
      },
      transformResponse: (response) => response.user,
      providesTags: (result, error, { userId }) =>
        result ? [{ type: 'User', id: userId }] : [],
    }),
    createUser: builder.mutation({
      query(body) {
        return {
          url: '/user',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query(body) {
        return {
          url: `/user/${body.id}`,
          method: 'PATCH',
          body,
          credentals: 'include',
        };
      },
      invalidatesTags: (result, error, { body }) => [
        {
          type: 'User',
          id: body.id,
        },
      ],
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/user/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
