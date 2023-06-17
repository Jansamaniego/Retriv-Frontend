import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logout } from '../redux/features/userSlice';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api`;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get('access_token');

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
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
