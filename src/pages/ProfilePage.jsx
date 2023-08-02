import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import ProfileHeader from '../components/profile/ProfileHeader';
import { useGetUserByIdQuery } from '../redux/services/userApi';

const ProfilePage = () => {
  const loggedInUser = useSelector((state) => state.userState.user);
  // if (isLoading) return <h3>Loading...</h3>;

  // if (!user) return <h3>No user found</h3>;

  return (
    <>
      <ProfileHeader user={loggedInUser} />
      <Outlet context={[loggedInUser]} />
    </>
  );
};

export default ProfilePage;
