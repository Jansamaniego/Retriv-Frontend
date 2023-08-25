import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { logout } from '../features/userSlice';
import { myProfileApi } from './myProfileApi';
import { cartApi } from './cartApi';
import { shopApi } from './shopApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: '/auth/register',
          method: 'POST',
          body: data,
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
    loginUser: builder.mutation({
      query(data) {
        return {
          url: '/auth/login',
          method: 'POST',
          body: data,
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
    logoutUser: builder.mutation({
      query() {
        return {
          url: '/auth/logout',
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query(data) {
        return {
          url: '/auth/forgot-password',
          method: 'POST',
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ password, passwordConfirmation, resetToken }) {
        return {
          url: `auth/reset-password?token=${resetToken}`,
          method: 'POST',
          body: { password, passwordConfirmation },
        };
      },
    }),
    changePassword: builder.mutation({
      query(data) {
        return {
          url: 'auth/change-password',
          body: data,
          method: 'PATCH',
          credentials: 'include',
        };
      },
      transformResponse: (data) => {
        return data.user;
      },
      invalidatesTags: (result, error) =>
        result ? [{ type: 'User', id: result.id }] : [],
    }),
    sendVerificationEmail: builder.mutation({
      query() {
        return {
          url: 'auth/send-verification-email',
          method: 'POST',
          credentials: 'include',
        };
      },
    }),
    verifyEmail: builder.mutation({
      query(emailToken) {
        return {
          url: `auth/verify-email?token=${emailToken}`,
          method: 'POST',
          credentials: 'include',
        };
      },
      transformResponse: (data) => {
        return data.user;
      },
      invalidatesTags: (result, error) =>
        result ? [{ type: 'User', id: result.id }] : [],
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
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
  useChangePasswordMutation,
} = authApi;
