import Cookies from 'js-cookie';
import { useGetMeQuery } from '../redux/services/userApi';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RestrictTo = ({ allowedRoles }) => {
  const isLoggedIn = Cookies.get('logged_in');
  const location = useLocation();

  const {
    data: user,
    isLoading,
    isFetching,
  } = useGetMeQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (isLoggedIn || user) && allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : isLoggedIn && user ? (
    <Navigate to="unauthorized" replace state={{ from: location }} />
  ) : (
    <Navigate to="login" replace state={{ from: location }} />
  );
};

export default RestrictTo;