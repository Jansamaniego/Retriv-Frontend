import { createApi } from '@reduxjs/toolkit/query/react';

import customBaseQuery from 'utils/customBaseQuery';
import { IUser } from 'types';
import {
  ICreateUserResponse,
  ICreateUser,
  IGetUserByIdResponse,
  IGetUsersResponse,
  IUpdateUserResponse,
  IUpdateUser,
  IDeleteUserResponse,
  IUserWithModifiedShops,
} from 'redux/services/userApi/userApi.types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUserWithModifiedShops[], null>({
      query() {
        return {
          url: '/user',
        };
      },
      transformResponse: (response: IGetUsersResponse) => {
        return response.users.results;
      },
      providesTags: (results) => {
        return results
          ? [
              ...results.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }];
      },
    }),
    getUserById: builder.query<IUser, string>({
      query(userId) {
        return {
          url: `/user/${userId}`,
        };
      },
      transformResponse: (response: IGetUserByIdResponse) => response.user,
      providesTags: (result, error, userId) =>
        result ? [{ type: 'User', id: userId }] : [],
    }),
    createUser: builder.mutation<ICreateUserResponse, ICreateUser>({
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
    updateUser: builder.mutation<IUpdateUserResponse, IUpdateUser>({
      query(body) {
        return {
          url: `/user/${body.id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'User', id: arg.id }] : [],
    }),
    deleteUser: builder.mutation<IDeleteUserResponse, string>({
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
