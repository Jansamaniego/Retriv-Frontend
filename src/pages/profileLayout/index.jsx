import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import ProfileHeader from './profileHeader';
import { useGetUserByIdQuery } from '../../redux/services/userApi';
import { Loading } from '../../components/common';

export const ProfileLayout = () => {
  const loggedInUser = useSelector((state) => state.userState.user);
  // if (isLoading) return <h3>Loading...</h3>;

  if (!loggedInUser) return <Loading />;

  return (
    <>
      <ProfileHeader user={loggedInUser} />
      <Outlet context={[loggedInUser]} />
    </>
  );
};
