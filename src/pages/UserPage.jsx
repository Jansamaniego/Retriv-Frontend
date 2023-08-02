import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import UserPageHeader from '../components/user/UserPageHeader';
import { useGetUserByIdQuery } from '../redux/services/userApi';

const UserPage = () => {
  const { userId } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);

  if (isLoading) return <h3>Loading...</h3>;

  if (!user) return <h3>No user found</h3>;

  return (
    <>
      <UserPageHeader user={user} />
      <Outlet context={[user]} />
    </>
  );
};

export default UserPage;
