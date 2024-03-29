import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useGetUserByIdQuery } from 'redux/services/userApi/userApi';
import UserShopManager from 'components/user/userShopManager';
import { Card, Loading } from 'components/common';
import UserInfo from 'pages/user/userInfo';
import UserControl from 'pages/user/userControl';

interface UserPageTabProps {
  isActive: boolean;
}

const StyledCard = styled(Card)`
  padding: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const UserPageFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const UserPageBody = styled.main`
  padding: 2rem;
`;

const UserPageTabs = styled.div`
  background-color: ${(props) => props.theme.neutral[700]};
`;

const UserPageTab = styled.button<UserPageTabProps>`
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

const UserText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

export const User = () => {
  const [isProfileTabOpen, setIsProfileTabOpen] = useState(true);
  const { userId = '' } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);

  if (isLoading) return <Loading />;

  if (!user) return <UserText>User is not found</UserText>;

  const { role } = user;

  return (
    <UserPageFlexWrapper>
      <div>
        <UserPageTabs>
          <UserPageTab
            onClick={() => setIsProfileTabOpen(true)}
            isActive={isProfileTabOpen}
          >
            profile
          </UserPageTab>
          {role === 'seller' ? (
            <UserPageTab
              onClick={() => setIsProfileTabOpen(false)}
              isActive={!isProfileTabOpen}
            >
              shops
            </UserPageTab>
          ) : null}
        </UserPageTabs>
        <StyledCard>
          <UserPageBody>
            {isProfileTabOpen ? (
              <UserInfo />
            ) : role === 'seller' ? (
              <UserShopManager user={user} />
            ) : null}
          </UserPageBody>
          <UserControl userId={userId} />
        </StyledCard>
      </div>
    </UserPageFlexWrapper>
  );
};
