import {
  BaseQueryFn,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import Cookies from 'universal-cookie';

import { logout } from 'redux/features/userSlice';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from './cookies';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseUrl = `${
  process.env.REACT_APP_NODE_ENV === 'development'
    ? process.env.REACT_APP_API_LOCAL_BASE_URL
    : process.env.REACT_APP_API_WEB_BASE_URL
}/api`;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const cookies = new Cookies(null, { path: '/' });

    const accessToken = cookies.get('access_token');

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  //@ts-ignore
  if (result.error?.data?.message === 'you are not logged in') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { credentials: 'include', url: 'auth/tokens' },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          //@ts-ignore
          const tokens = refreshResult?.data?.tokens;

          if (tokens) {
            const cookies = new Cookies(null, { path: '/' });

            cookies.set(
              'access_token',
              tokens.accessToken,
              accessTokenCookieOptions
            );

            cookies.set(
              'refresh_token',
              tokens.refreshToken,
              refreshTokenCookieOptions
            );

            cookies.set('logged_in', true, accessTokenCookieOptions);
          }

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          window.location.href = '/login';
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customBaseQuery;
