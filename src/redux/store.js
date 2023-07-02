import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { myProfileApi } from './services/myProfileApi';
import { userApi } from './services/userApi';
import { shopApi } from './services/shopApi';
import { orderApi } from './services/orderApi';
import { productApi } from './services/productApi';
import { reviewApi } from './services/reviewApi';
import { cartApi } from './services/cartApi';
import { overallStatsApi } from './services/stats/overallStatsApi';
import { shopStatsApi } from './services/stats/shopStatsApi';
import { productStatsApi } from './services/stats/productStatsApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { shopRatingsApi } from './services/ratings/shopRatingsApi';
import { productRatingsApi } from './services/ratings/productRatingsApi';
import userReducer from './features/userSlice';
import shopReducer from './features/shopSlice';
import themeReducer from './features/themeSlice';
import searchReducer from './features/searchSlice';

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
    userState: userReducer,
    shopState: shopReducer,
    themeState: themeReducer,
    searchState: searchReducer,
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
      overallStatsApi.middleware,
      shopStatsApi.middleware,
      productStatsApi.middleware,
      shopRatingsApi.middleware,
      productRatingsApi.middleware
    ),
});

setupListeners(store.dispatch);
