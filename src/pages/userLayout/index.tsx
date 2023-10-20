import { Outlet, useParams } from 'react-router-dom';

import { IUser } from 'types';
import { useGetUserByIdQuery } from 'redux/services/userApi/userApi';
import UserHeader from 'pages/userLayout/userHeader';

type ContextType = { user: IUser | null };

export const UserLayout = () => {
  const { userId = '' } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);

  if (isLoading) return <h3>Loading...</h3>;

  if (!user) return <h3>No user found</h3>;

  return (
    <>
      <UserHeader user={user} />
      <Outlet context={{ user } satisfies ContextType} />
    </>
  );
};
