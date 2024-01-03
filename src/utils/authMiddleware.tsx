import { Loading } from 'components/common';
import React from 'react';
import { useCookies } from 'react-cookie';

import { myProfileApi } from 'redux/services/myProfileApi/myProfileApi';

interface IAuthMiddleWareProps {
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<IAuthMiddleWareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);

  console.log(cookies);

  const { isLoading } = myProfileApi.endpoints.getMe.useQuery(null, {
    skip: !cookies.logged_in,
  });

  if (isLoading) {
    return <Loading />;
  }

  return children;
};

export default AuthMiddleware;
