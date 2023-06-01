import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from './services/authApi';
import { myProfileApi } from './services/myProfileApi';
import { userApi } from './services/userApi';
import { shopApi } from './services/shopApi';
import { orderApi } from './services/orderApi';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [myProfileApi.reducerPath]: myProfileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    userState: userReducer,
  },

  devTools: process.env.REACT_APP_NODE_ENV === 'development',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      myProfileApi.middleware,
      userApi.middleware,
      shopApi.middleware,
      orderApi.middleware
    ),
});
