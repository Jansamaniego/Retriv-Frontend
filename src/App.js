import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import GlobalStyle from './components/global/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { themeSettings } from './components/theme/theme';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RestrictTo from './pages/RestrictTo';
import Unauthorized from './pages/Unauthorized';
import VerifyEmail from './pages/VerifyEmail';
import ProfileInfo from './pages/ProfileInfo';
import ChangePassword from './pages/ChangePassword';
import SendVerificationEmail from './pages/SendVerificationEmail';
import Admin from './pages/Admin';
import UserManager from './components/user/UserManager';
import ShopManager from './components/shop/ShopManager';
import OrderManager from './components/order/OrderManager';
import ProfileHeader from './components/profile/ProfileHeader';

const App = (props) => {
  const theme = useSelector((state) => state.themeState.theme);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<RestrictTo allowedRoles={['admin']} />}>
          <Route path="admin" element={<Admin />}>
            <Route index element={<UserManager />} />
            <Route path="shop" relative element={<ShopManager />} />
            <Route path="order" relative element={<OrderManager />} />
          </Route>
        </Route>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route
          element={<RestrictTo allowedRoles={['user', 'admin', 'seller']} />}
        >
          <Route path="profile" element={<ProfileHeader />}>
            <Route index element={<ProfileInfo />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route
              path="send-verification-email"
              element={<SendVerificationEmail />}
            />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <ThemeProvider theme={themeSettings(theme)}>
      <GlobalStyle />
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
};

export default App;
