import React from 'react';
import { useCookies } from 'react-cookie';
// import FullScreenLoader from '../components/FullScreenLoader';
import { myProfileApi } from '../redux/services/myProfileApi';

const AuthMiddleware = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);

  const { isLoading } = myProfileApi.endpoints.getMe.useQuery(null, {
    skip: !cookies.logged_in,
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return children;
};

export default AuthMiddleware;
