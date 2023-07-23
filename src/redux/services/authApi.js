import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';
import { logout } from '../features/userSlice';
import { myProfileApi } from './myProfileApi';
import { cartApi } from './cartApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
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
          await dispatch(myProfileApi.endpoints.getMe.initiate());
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
          await dispatch(myProfileApi.endpoints.getMe.initiate(null));
          await dispatch(cartApi.endpoints.getCart.initiate(null));
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
          url: 'auth/forgot-password',
          method: 'PATCH',
          body: data,
          credentials: 'include',
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ password, passwordConfirmation, resetToken }) {
        return {
          url: `auth/reset-password?token=${resetToken}`,
          method: 'POST',
          body: { password, passwordConfirmation },
          credentials: 'include',
        };
      },
    }),
    changePassword: builder.mutation({
      query(data) {
        return {
          url: 'auth/change-password',
          body: data,
          method: 'POST',
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
          url: `auth/reset-password?token=${emailToken}`,
          method: 'POST',
          credentials: 'include',
        };
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
