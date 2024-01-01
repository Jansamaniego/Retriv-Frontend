import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from 'redux/store';
import {
  authApi,
  cartApi,
  categoryApi,
  myProfileApi,
  orderApi,
  overallStatsApi,
  paymentIntentApi,
  productApi,
  productRatingsApi,
  productStatsApi,
  reviewApi,
  shopApi,
  shopRatingsApi,
  shopStatsApi,
  userApi,
} from 'redux/services';
import userReducer from 'redux/features/userSlice';
import shopReducer from 'redux/features/shopSlice';
import themeReducer from 'redux/features/themeSlice';
import cartReducer from 'redux/features/cartSlice';
import tokenReducer from 'redux/features/tokenSlice';
import { ThemeProvider, useTheme } from 'styled-components';
import { useSelector } from 'react-redux';
import { themeSettings } from 'components/theme';
import { MemoryRouter } from 'react-router-dom';
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
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
        tokenState: tokenReducer,
      },
      preloadedState,
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
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    const theme = store.getState().themeState.theme;
    return (
      <Provider store={store}>
        <ThemeProvider theme={themeSettings(theme)}>
          <MemoryRouter>{children}</MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
