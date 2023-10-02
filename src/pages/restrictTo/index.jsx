import Cookies from 'js-cookie';
import { useGetMeQuery } from '../../redux/services/myProfileApi/myProfileApi';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export const RestrictTo = ({ allowedRoles }) => {
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
    return <h1>Loading...</h1>;
  }

  return isLoggedIn && user && allowedRoles.includes(user?.role) ? (
    <Outlet context={[user]} />
  ) : isLoggedIn && user ? (
    <Navigate to="unauthorized" replace state={{ from: location }} />
  ) : (
    <Navigate to="login" replace state={{ from: location }} />
  );

  // return <Navigate to="login" replace state={{ from: location }} />;
};
