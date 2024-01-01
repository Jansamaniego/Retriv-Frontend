import { createApi } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';

import customBaseQuery from 'utils/customBaseQuery';
import {
  IloginResponse,
  ILogin,
  IRegisterResponse,
  IRegister,
  IForgotPassword,
  IResetPassword,
  IChangePasswordResponse,
  IChangePassword,
  IVerifyEmailResponse,
} from 'redux/services/authApi/authApi.types';
import { IResponse, IUser } from 'types';
import { myProfileApi } from 'redux/services/myProfileApi/myProfileApi';
import { logout } from 'redux/features/userSlice';
import { setTokens } from 'redux/features/tokenSlice';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from 'utils/cookies';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<IRegisterResponse, IRegister>({
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
          const {
            data: { tokens, user },
          } = await queryFulfilled;

          const cookies = new Cookies(null, { path: '/' });

          // cookies.set(
          //   'access_token',
          //   tokens.accessToken,
          //   accessTokenCookieOptions
          // );

          // cookies.set(
          //   'refresh_token',
          //   tokens.refreshToken,
          //   refreshTokenCookieOptions
          // );

          cookies.set('logged_in', true, accessTokenCookieOptions);

          await dispatch(
            myProfileApi.endpoints.getMe.initiate(null, { forceRefetch: true })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation<IloginResponse, ILogin>({
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
          const {
            data: { tokens, user },
          } = await queryFulfilled;

          const cookies = new Cookies(null, { path: '/' });

          // cookies.set(
          //   'access_token',
          //   tokens.accessToken,
          //   accessTokenCookieOptions
          // );

          // cookies.set(
          //   'refresh_token',
          //   tokens.refreshToken,
          //   refreshTokenCookieOptions
          // );

          cookies.set('logged_in', true, {
            maxAge:
              Number(process.env.REACT_APP_JWT_ACCESS_EXPIRATION_MINUTES) *
              60 *
              1000,
            httpOnly: false,
            sameSite: 'none',
            secure: true,
          });

          await dispatch(
            myProfileApi.endpoints.getMe.initiate(null, { forceRefetch: true })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation<IResponse, null>({
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
    forgotPassword: builder.mutation<IResponse, IForgotPassword>({
      query(data) {
        return {
          url: '/auth/forgot-password',
          method: 'POST',
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation<IResponse, IResetPassword>({
      query({ password, passwordConfirmation, resetToken }) {
        return {
          url: `auth/reset-password?token=${resetToken}`,
          method: 'POST',
          body: { password, passwordConfirmation },
        };
      },
    }),
    changePassword: builder.mutation<IUser, IChangePassword>({
      query(data) {
        return {
          url: 'auth/change-password',
          body: data,
          method: 'PATCH',
          credentials: 'include',
        };
      },
      transformResponse: (data: IChangePasswordResponse) => {
        return data.user;
      },
      invalidatesTags: (result, error) => {
        console.log(result);
        return result ? [{ type: 'User' as const, id: result.id }] : [];
      },
    }),
    sendVerificationEmail: builder.mutation<IResponse, void>({
      query() {
        return {
          url: 'auth/send-verification-email',
          method: 'POST',
          credentials: 'include',
        };
      },
    }),
    verifyEmail: builder.mutation<IUser, string>({
      query(emailToken) {
        return {
          url: `auth/verify-email?token=${emailToken}`,
          method: 'POST',
          credentials: 'include',
        };
      },
      transformResponse: (data: IVerifyEmailResponse) => {
        return data.user;
      },
      invalidatesTags: (result, error) =>
        result ? [{ type: 'User' as const, id: result.id }] : [],
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
