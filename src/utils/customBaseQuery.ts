import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import Cookies from 'js-cookie';

import { logout } from 'redux/features/userSlice';

const baseUrl = `${
  process.env.REACT_APP_NODE_ENV === 'development'
    ? process.env.REACT_APP_API_LOCAL_BASE_URL
    : process.env.REACT_APP_API_WEB_BASE_URL
}/api`;

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

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  console.log(result);
  console.log(process.env.REACT_APP_NODE_ENV);
  console.log(process.env.REACT_APP_NODE_ENV === 'development');
  console.log(baseUrl);

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
