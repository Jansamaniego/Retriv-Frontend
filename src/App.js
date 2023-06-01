import { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MyProfile from './pages/MyProfile';
import RestrictTo from './pages/RestrictTo';
import Unauthorized from './pages/Unauthorized';
import VerifyEmail from './pages/VerifyEmail';
import MyProfileStats from './components/myProfile/MyProfileStats';
import MyProfileInfo from './components/myProfile/MyProfileInfo';
import MyProfileShopManager from './components/myProfile/MyProfileShopManager';
import ChangePassword from './components/myProfile/ChangePassword';
import SendVerificationEmail from './components/myProfile/SendVerificationEmail';
import Admin from './pages/Admin';
import UserManager from './components/user/UserManager';
import ShopManager from './components/shop/ShopManager';
import OrderManager from './components/order/OrderManager';

const App = (props) => {
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
          <Route path="my-profile" element={<MyProfile />}>
            <Route index element={<MyProfileStats />} />
            <Route path="my-info" element={<MyProfileInfo />} />
            <Route path="my-shops" element={<MyProfileShopManager />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route
              path="send-verification-email"
              element={<SendVerificationEmail />}
            />
          </Route>
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
