import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import UserHeader from './userHeader';
import { useGetUserByIdQuery } from '../../redux/services/userApi/userApi';
import { IUser } from 'src/types';

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
