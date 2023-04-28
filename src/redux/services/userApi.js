import { createApi } from '@reduxjs/toolkit/dist/query';
import customBaseQuery from '../../utils/customBaseQuery';
import { setUser } from '../features/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({}),
});
