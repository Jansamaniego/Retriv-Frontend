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
import AuthMiddleware from './utils/authMiddleware';
import {
  Home,
  MyShop,
  Shop,
  Product,
  User,
  UserLayout,
  Profile,
  ProfileLayout,
  Category,
  Categories,
  Cart,
  NotFound,
  RestrictTo,
  Unauthorized,
  VerifyEmail,
  ChangePassword,
  SendVerificationEmail,
  CheckOut,
  ForgotPassword,
  AdminDashboard,
  AdminOrder,
  AdminUser,
  CreateCategory,
  CreateProduct,
  CreateShop,
  CreateUser,
  Login,
  MyOrders,
  Order,
  PaymentCompletion,
  Register,
  ResetPassword,
} from './pages';

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
        <Route path="/user/:userId" element={<UserLayout />}>
          <Route index element={<User />} />
        </Route>
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/category" element={<Categories />} />
        <Route element={<RestrictTo allowedRoles={['admin']} />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="user-table" element={<AdminUser />} />
          <Route path="order-table" element={<AdminOrder />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="create-category" element={<CreateCategory />} />
        </Route>
        <Route element={<RestrictTo allowedRoles={['seller']} />}>
          <Route path="/my-shop" element={<MyShop />} />
          <Route path="/add-product" element={<CreateProduct />} />
        </Route>
        <Route
          element={<RestrictTo allowedRoles={['user', 'admin', 'seller']} />}
        >
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/completion" element={<PaymentCompletion />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="order/:orderId" element={<Order />} />
          <Route path="/create-shop" element={<CreateShop />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route
              path="send-verification-email"
              element={<SendVerificationEmail />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
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
