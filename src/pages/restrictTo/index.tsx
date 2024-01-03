import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useGetMeQuery } from 'redux/services/myProfileApi/myProfileApi';
import { useCookies } from 'react-cookie';
import { Loading } from 'components/common';

interface IRestrictToProps {
  allowedRoles: string[];
}

export const RestrictTo: React.FC<IRestrictToProps> = ({ allowedRoles }) => {
  const isLoggedIn = Cookies.get('logged_in');
  const location = useLocation();

  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
  } = useGetMeQuery(null, {
    skip: false,
  });

  useEffect(() => {
    const refetchUser = async () => {
      refetch();
    };
    if (isLoggedIn) {
      refetchUser();
    }
  }, [isLoggedIn, refetch]);

  const loading = isLoading || isFetching;

  if (loading) {
    return <Loading />;
  }

  return isLoggedIn && user && allowedRoles.includes(user?.role) ? (
    <Outlet context={[user]} />
  ) : isLoggedIn && user ? (
    <Navigate to="unauthorized" replace state={{ from: location }} />
  ) : (
    <Navigate to="login" replace state={{ from: location }} />
  );
};
