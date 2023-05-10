import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProfilePageHeader from '../components/user/ProfilePageHeader';
import { Button } from '../components/common';
import UserDetails from '../components/user/UserDetails';
import UpdateProfile from '../components/user/UpdateProfile';
import ChangePassword from '../components/user/ChangePassword';
import SendVerificationEmail from '../components/user/SendVerificationEmail';

const ProfilePageMain = styled.main`
  display: flex;
`;

const MyProfile = () => {
  const user = useSelector((state) => state.userState.user);

  const [pageMode, setPageMode] = useState({
    userDetails: true,
    updateProfile: false,
    changePassword: false,
    verifyEmail: false,
  });

  const { userDetails, updateProfile, changePassword, verifyEmail } = pageMode;

  const userDetailsClickHandler = () => {
    setPageMode({
      userDetails: true,
      updateProfile: false,
      changePassword: false,
      verifyEmail: false,
    });
  };
  const updateProfileClickHandler = () => {
    setPageMode({
      userDetails: false,
      updateProfile: true,
      changePassword: false,
      verifyEmail: false,
    });
  };
  const changePasswordClickHandler = () => {
    setPageMode({
      userDetails: false,
      updateProfile: false,
      changePassword: true,
      verifyEmail: false,
    });
  };
  const verifyEmailClickHandler = () => {
    setPageMode({
      userDetails: false,
      updateProfile: false,
      changePassword: false,
      verifyEmail: true,
    });
  };

  return user ? (
    <>
      <ProfilePageHeader
        name={user.name}
        profileImage={user.profileImage}
        email={user.email}
        username={user.username}
      />
      <ProfilePageMain>
        <div>
          <Button onClick={userDetailsClickHandler}>User Details</Button>
          <Button onClick={updateProfileClickHandler}>
            Update User Details
          </Button>
          <Button onClick={changePasswordClickHandler}>Change Password</Button>
          {user.isEmailVerified ? null : (
            <Button onClick={verifyEmailClickHandler}>Verify Email</Button>
          )}
        </div>
        <div>
          {userDetails ? (
            <UserDetails user={user} />
          ) : updateProfile ? (
            <UpdateProfile user={user} />
          ) : changePassword ? (
            <ChangePassword user={user} />
          ) : verifyEmail ? (
            user.isEmailVerified ? null : (
              <SendVerificationEmail user={user} />
            )
          ) : (
            <UserDetails user={user} />
          )}
        </div>
      </ProfilePageMain>
    </>
  ) : (
    <h1>Loading..</h1>
  );
};

export default MyProfile;
