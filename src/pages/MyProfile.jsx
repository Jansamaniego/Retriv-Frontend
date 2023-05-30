import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MyProfileHeader from '../components/user/MyProfileHeader';
import { Button } from '../components/common';
import MyProfileStats from '../components/user/MyProfileStats';
import UserShopManager from '../components/shop/UserShopManager';
import MyProfileInfo from '../components/user/MyProfileInfo';
import ChangePassword from '../components/user/ChangePassword';
import SendVerificationEmail from '../components/user/SendVerificationEmail';

const MyProfilePageContainer = styled.div`
  max-width: 300ch;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
`;

const MyProfilePageGrid = styled.section`
  display: grid;
  width: 100%;
  max-width: 280ch;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 4fr;
  row-gap: 5rem;
  max-height: 70vh;
`;

const MyProfileMenu = styled.nav`
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: center;
  gap: 1rem;
`;

const MyProfile = () => {
  const user = useSelector((state) => state.userState.user);

  const [pageMode, setPageMode] = useState({
    myProfileStats: true,
    userShopManager: false,
    myProfileInfo: false,
    changePassword: false,
    verifyEmail: false,
  });

  const {
    myProfileStats,
    userShopManager,
    myProfileInfo,
    changePassword,
    verifyEmail,
  } = pageMode;

  const myProfileStatsClickHandler = () => {
    setPageMode({
      myProfileStats: true,
      userShopManager: false,
      myProfileInfo: false,
      changePassword: false,
      verifyEmail: false,
    });
  };
  const myProfileInfoClickHandler = () => {
    setPageMode({
      myProfileStats: false,
      userShopManager: false,
      myProfileInfo: true,
      changePassword: false,
      verifyEmail: false,
    });
  };
  const changePasswordClickHandler = () => {
    setPageMode({
      myProfileStats: false,
      userShopManager: false,
      myProfileInfo: false,
      changePassword: true,
      verifyEmail: false,
    });
  };
  const verifyEmailClickHandler = () => {
    setPageMode({
      myProfileStats: false,
      userShopManager: false,
      myProfileInfo: false,
      changePassword: false,
      verifyEmail: true,
    });
  };

  const userShopManagerClickHandler = () => {
    setPageMode({
      myProfileStats: false,
      userShopManager: true,
      myProfileInfo: false,
      changePassword: false,
      verifyEmail: false,
    });
  };

  return user ? (
    <MyProfilePageContainer>
      <MyProfilePageGrid>
        <MyProfileHeader
          name={user.name}
          profileImage={user.profileImage}
          email={user.email}
          username={user.username}
          shops={user.shops}
        />
        <MyProfileMenu>
          <Button onClick={myProfileStatsClickHandler} large menu>
            User Stats
          </Button>
          <Button onClick={myProfileInfoClickHandler} large menu>
            User Info
          </Button>
          <Button onClick={userShopManagerClickHandler} large menu>
            User Shops
          </Button>
          <Button onClick={changePasswordClickHandler} large menu>
            Change Password
          </Button>
          {user.isEmailVerified ? null : (
            <Button onClick={verifyEmailClickHandler} large menu>
              Verify Email
            </Button>
          )}
        </MyProfileMenu>
        {myProfileStats ? (
          <MyProfileStats user={user} />
        ) : myProfileInfo ? (
          <MyProfileInfo user={user} />
        ) : userShopManager ? (
          <UserShopManager user={user} />
        ) : changePassword ? (
          <ChangePassword user={user} />
        ) : verifyEmail ? (
          user.isEmailVerified ? null : (
            <SendVerificationEmail user={user} />
          )
        ) : (
          <MyProfileStats user={user} />
        )}
      </MyProfilePageGrid>
    </MyProfilePageContainer>
  ) : (
    <h1>Loading..</h1>
  );
};

export default MyProfile;
