import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../redux/services/userApi';
import UserPageHeader from '../components/user/UserPageHeader';
import UserShopManager from '../components/user/UserShopManager';
import UserProfileInfo from '../components/user/UserProfileInfo';
import styled from 'styled-components';
import { Card } from '../components/common';

const StyledCard = styled(Card)`
  padding: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const UserPageBody = styled.main`
  padding: 2rem;
`;

const UserPageTabs = styled.div`
  background-color: ${(props) => props.theme.neutral[700]};
`;

const UserPageTab = styled.button`
  background-color: ${(props) =>
    props.isActive ? props.theme.neutral[900] : props.theme.neutral[800]};
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 0.8rem 1.6rem;
  border: 0;
  font-size: 1.6rem;
  font-weight: ${(props) => (props.isActive ? '400' : '300')};
  cursor: pointer;
`;

const UserPage = () => {
  const [isProfileTabOpen, setIsProfileTabOpen] = useState(true);
  const { userId } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);

  if (isLoading) return <h1>Loading...</h1>;

  const { role } = user;

  return (
    <>
      <UserPageHeader user={user} />
      <div>
        <UserPageTabs>
          <UserPageTab
            onClick={() => setIsProfileTabOpen(true)}
            isActive={isProfileTabOpen}
          >
            profile
          </UserPageTab>
          {role === 'seller' ? (
            <UserPageTab onClick={() => setIsProfileTabOpen(false)}>
              shops
            </UserPageTab>
          ) : null}
        </UserPageTabs>
        <StyledCard>
          <UserPageBody>
            {isProfileTabOpen ? (
              <UserProfileInfo user={user} />
            ) : role === 'seller' ? (
              <UserShopManager user={user} />
            ) : null}
          </UserPageBody>
        </StyledCard>
      </div>
    </>
  );
};

export default UserPage;
