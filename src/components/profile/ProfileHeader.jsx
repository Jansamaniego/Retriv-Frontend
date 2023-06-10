import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Card } from '../common';
import styled from 'styled-components';
import { InstagramIcon, TwitterIcon, FacebookIcon } from '../../assets/icons';

const ProfileHeaderCard = styled(Card)`
  position: relative;
  padding: 0;
`;

const ColoredDiv = styled.div`
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.secondary[700]},
    ${(props) => props.theme.secondary[600]}
  );
  min-height: 25rem;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
`;

const NormalDiv = styled.div`
  width: 100%;
  min-height: 16rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  position: relative;
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  left: 8rem;
  bottom: 2rem;
  max-width: 18rem;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
`;

const UserHeaderInfoFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 28rem;
`;

const UserHeaderInfo = styled.div``;

const UserHeaderInfoName = styled.h4`
  font-weight: 700;
`;
const UserHeaderInfoEmail = styled.h5`
  font-weight: 300;
`;
const UserHeaderInfoRole = styled.h5`
  font-weight: 300;
`;

const SocialsFlexContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
`;

const ProfileHeader = () => {
  const user = useSelector((state) => state.userState.user);

  const { profileImage, name, email, role } = user;

  return (
    <>
      <ProfileHeaderCard>
        <ColoredDiv />
        <NormalDiv>
          <ProfileImageContainer>
            <ProfileImage src={profileImage} />
          </ProfileImageContainer>
          <UserHeaderInfoFlexContainer>
            <UserHeaderInfo>
              <UserHeaderInfoName>{name}</UserHeaderInfoName>
              <UserHeaderInfoEmail>{email}</UserHeaderInfoEmail>
              <UserHeaderInfoRole>{role}</UserHeaderInfoRole>
            </UserHeaderInfo>
            <SocialsFlexContainer>
              <h5>socials</h5>
              <InstagramIcon width="4rem" />
              <TwitterIcon width="4rem" />
              <FacebookIcon width="4rem" />
            </SocialsFlexContainer>
          </UserHeaderInfoFlexContainer>
        </NormalDiv>
      </ProfileHeaderCard>
      <Outlet context={[user]} />
    </>
  );
};

export default ProfileHeader;
