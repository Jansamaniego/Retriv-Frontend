import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyle from './components/globalStyles';
import { ThemeProvider } from 'styled-components';
import { themeSettings } from './components/theme';
import RootLayout from './components/layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RestrictTo from './pages/RestrictTo';
import Unauthorized from './pages/Unauthorized';
import VerifyEmail from './pages/VerifyEmail';
import ChangePassword from './pages/ChangePassword';
import SendVerificationEmail from './pages/SendVerificationEmail';
import AdminDashboard from './pages/AdminDashboard';
import UserPage from './pages/UserPage';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import Payment from './components/order/Payment';
import PaymentCompletion from './pages/PaymentCompletion';
import AdminUserTablePage from './pages/AdminUserTablePage';
import AdminOrderTablePage from './pages/AdminOrderTablePage';
import PlacedOrderPage from './pages/PlacedOrderPage';
import CreateUserPage from './pages/CreateUserPage';
import CreateShopPage from './pages/CreateShopPage';
import CreateProductForm from './pages/CreateProductForm';
import UserPageContent from './components/user/UserPageContent';
import ProfilePage from './pages/ProfilePage';
import ProfilePageContent from './components/profile/ProfilePageContent';
import AuthMiddleware from './utils/authMiddleware';
import { Home, MyShop, Shop, Product, Category, Categories } from './pages';
import NoTFound from './pages/NotFound';
import MyOrdersPage from './pages/MyOrdersPage';
import CreateCategory from './pages/CreateCategory';

const App = (props) => {
  const theme = useSelector((state) => state.themeState.theme);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/shop/:shopId/product/:productId" element={<Product />} />
        <Route path="/shop/:shopId" element={<Shop />} />
        <Route path="/user/:userId" element={<UserPage />}>
          <Route index element={<UserPageContent />} />
        </Route>
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/category" element={<Categories />} />
        <Route element={<RestrictTo allowedRoles={['admin']} />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="user-table" element={<AdminUserTablePage />} />
          <Route path="order-table" element={<AdminOrderTablePage />} />
          <Route path="create-user" element={<CreateUserPage />} />
          <Route path="create-category" element={<CreateCategory />} />
        </Route>
        <Route element={<RestrictTo allowedRoles={['seller']} />}>
          <Route path="/my-shop" element={<MyShop />} />
          <Route path="/add-product" element={<CreateProductForm />} />
        </Route>
        <Route
          element={<RestrictTo allowedRoles={['user', 'admin', 'seller']} />}
        >
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/payment-test" element={<Payment />} />
          <Route path="/completion" element={<PaymentCompletion />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="order/:orderId" element={<PlacedOrderPage />} />
          <Route path="/create-shop" element={<CreateShopPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="profile" element={<ProfilePage />}>
            <Route index element={<ProfilePageContent />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route
              path="send-verification-email"
              element={<SendVerificationEmail />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NoTFound />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={themeSettings(theme)}>
      <GlobalStyle />
      <AuthMiddleware>
        <RouterProvider router={router} />
      </AuthMiddleware>
    </ThemeProvider>
  );
};

export default App;
