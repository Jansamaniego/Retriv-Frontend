import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Card } from '../../components/common';
import UserShopManager from './userShopManager';
import ProfileInfo from './profileInfo';

const StyledCard = styled(Card)`
  padding: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const ProfilePageFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfilePageBody = styled.main`
  padding: 2rem;
`;

const ProfilePageTabs = styled.div`
  background-color: ${(props) => props.theme.neutral[700]};
`;

const ProfilePageTab = styled.button`
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

export const Profile = () => {
  const [isProfileTabOpen, setIsProfileTabOpen] = useState(true);
  const loggedInUser = useSelector((state) => state.userState.user);

  const { role } = loggedInUser;

  return (
    <ProfilePageFlexWrapper>
      <div>
        <ProfilePageTabs>
          <ProfilePageTab
            onClick={() => setIsProfileTabOpen(true)}
            isActive={isProfileTabOpen}
          >
            profile
          </ProfilePageTab>
          {role === 'seller' && (
            <ProfilePageTab
              onClick={() => setIsProfileTabOpen(false)}
              isActive={!isProfileTabOpen}
            >
              shops
            </ProfilePageTab>
          )}
        </ProfilePageTabs>
        <StyledCard>
          <ProfilePageBody>
            {isProfileTabOpen ? (
              <ProfileInfo user={loggedInUser} />
            ) : role === 'seller' ? (
              <UserShopManager user={loggedInUser} />
            ) : null}
          </ProfilePageBody>
        </StyledCard>
      </div>
    </ProfilePageFlexWrapper>
  );
};
