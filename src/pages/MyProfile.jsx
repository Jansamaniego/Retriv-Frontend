import React, { useState } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MyProfileHeader from '../components/profile/MyProfileHeader';
import { Button } from '../components/common';

const MyProfilePageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
`;

const MyProfilePageGrid = styled.section`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 4fr;
  row-gap: 5rem;
  max-height: 80vh;
`;

const MyProfileMenu = styled.nav`
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: center;
  gap: 1rem;
`;

const MyProfile = () => {
  const [user] = useOutletContext();

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
          <Link to="/my-profile">
            <Button large menu>
              My Stats
            </Button>
          </Link>
          <Link to="my-info" relative>
            <Button large menu>
              My Info
            </Button>
          </Link>
          <Link to="my-shops" relative>
            <Button large menu>
              My Shops
            </Button>
          </Link>
          <Link to="change-password" relative>
            <Button large menu>
              Change Password
            </Button>
          </Link>
          {user.isEmailVerified ? null : (
            <Link to="send-verification-email" relative>
              <Button large menu>
                Verify Email
              </Button>
            </Link>
          )}
        </MyProfileMenu>
        <Outlet context={[user]} />
      </MyProfilePageGrid>
    </MyProfilePageContainer>
  ) : (
    <h1>Loading..</h1>
  );
};

export default MyProfile;
