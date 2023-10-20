import React from 'react';
import { useCookies } from 'react-cookie';

import { myProfileApi } from 'redux/services/myProfileApi/myProfileApi';

interface IAuthMiddleWareProps {
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<IAuthMiddleWareProps> = ({ children }) => {
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
