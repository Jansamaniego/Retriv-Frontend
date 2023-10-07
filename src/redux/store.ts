import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import {
  authApi,
  myProfileApi,
  userApi,
  shopApi,
  orderApi,
  productApi,
  reviewApi,
  cartApi,
  overallStatsApi,
  shopStatsApi,
  productStatsApi,
  shopRatingsApi,
  productRatingsApi,
  paymentIntentApi,
  categoryApi,
} from './services';
import userReducer from './features/userSlice';
import shopReducer from './features/shopSlice';
import themeReducer from './features/themeSlice';
import cartReducer from './features/cartSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [myProfileApi.reducerPath]: myProfileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [overallStatsApi.reducerPath]: overallStatsApi.reducer,
    [shopStatsApi.reducerPath]: shopStatsApi.reducer,
    [productStatsApi.reducerPath]: productStatsApi.reducer,
    [shopRatingsApi.reducerPath]: shopRatingsApi.reducer,
    [productRatingsApi.reducerPath]: productRatingsApi.reducer,
    [paymentIntentApi.reducerPath]: paymentIntentApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    userState: userReducer,
    shopState: shopReducer,
    themeState: themeReducer,
    cartState: cartReducer,
  },

  devTools: process.env.REACT_APP_NODE_ENV === 'development',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      myProfileApi.middleware,
      userApi.middleware,
      shopApi.middleware,
      orderApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      reviewApi.middleware,
      categoryApi.middleware,
      overallStatsApi.middleware,
      shopStatsApi.middleware,
      productStatsApi.middleware,
      shopRatingsApi.middleware,
      productRatingsApi.middleware,
      paymentIntentApi.middleware
    ),
});

setupListeners(store.dispatch);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
