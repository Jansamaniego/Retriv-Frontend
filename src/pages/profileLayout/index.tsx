import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import ProfileHeader from './profileHeader';
import { useGetUserByIdQuery } from '../../redux/services/userApi/userApi';
import { Loading } from '../../components/common';
import { RootState } from 'src/redux/store';
import { IUser } from 'src/types';

type ContextType = { user: IUser | null };

export const ProfileLayout = () => {
  const loggedInUser = useSelector((state: RootState) => state.userState.user);
  // if (isLoading) return <h3>Loading...</h3>;

  if (!loggedInUser) return <Loading />;

  return (
    <>
      <ProfileHeader user={loggedInUser} />
      <Outlet context={{ user: loggedInUser } satisfies ContextType} />
    </>
  );
};

export function useUser() {
  return useOutletContext<ContextType>();
}
