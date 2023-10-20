import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useOutletContext } from 'react-router-dom';

import { IUser } from 'types';
import { RootState } from 'redux/store';
import { Loading } from 'components/common';
import ProfileHeader from 'pages/profileLayout/profileHeader';

type ContextType = { user: IUser | null };

export const ProfileLayout = () => {
  const loggedInUser = useSelector((state: RootState) => state.userState.user);

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
