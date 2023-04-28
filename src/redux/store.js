import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from './services/authApi';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    userState: userReducer,
  },
  devTools: process.env.REACT_APP_NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});
