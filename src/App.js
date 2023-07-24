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
import ProfileHeader from './components/profile/ProfileHeader';
import AdminDashboard from './pages/AdminDashboard';
import UserPage from './pages/UserPage';
import ProductManager from './pages/ProductManager';
import ProductPage from './pages/ProductPage';
import ShopPage from './pages/ShopPage';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import Payment from './components/order/Payment';
import PaymentCompletion from './pages/PaymentCompletion';
import { useCreatePaymentIntentMutation } from './redux/services/orderApi';
import { useGetCartQuery } from './redux/services/cartApi';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AdminUserTablePage from './pages/AdminUserTablePage';
import AdminOrderTablePage from './pages/AdminOrderTablePage';
import PlacedOrderPage from './pages/PlacedOrderPage';
import CreateUserPage from './pages/CreateUserPage';
import CreateShopPage from './pages/CreateShopPage';
import MyShopPage from './pages/MyShopPage';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const App = (props) => {
  const theme = useSelector((state) => state.themeState.theme);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<ProductManager />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route
          path="shop/:shopId/product/:productId"
          element={<ProductPage />}
        />
        <Route path="shop/:shopId" element={<ShopPage />} />
        <Route path="user/:userId" element={<UserPage />} />
        <Route path="order/:orderId" element={<PlacedOrderPage />} />
        <Route element={<RestrictTo allowedRoles={['admin']} />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="user-table" element={<AdminUserTablePage />} />
          <Route path="order-table" element={<AdminOrderTablePage />} />
          <Route path="create-user" element={<CreateUserPage />} />
        </Route>
        <Route element={<RestrictTo allowedRoles={['seller']} />}>
          <Route path="/my-shop" element={<MyShopPage />} />
        </Route>
        <Route
          element={<RestrictTo allowedRoles={['user', 'admin', 'seller']} />}
        >
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/payment-test" element={<Payment />} />
          <Route path="/completion" element={<PaymentCompletion />} />
          <Route path="/create-shop" element={<CreateShopPage />} />
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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
