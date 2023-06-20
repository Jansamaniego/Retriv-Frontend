import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Card, Socials } from '../common';
import styled from 'styled-components';

const ProfileHeaderCard = styled(Card)`
  position: relative;
  padding: 0;
  margin-bottom: 3.2rem;
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
  bottom: 4rem;
  max-width: 18rem;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  outline: 0.5rem solid ${(props) => props.theme.neutral[900]};
  object-fit: cover;
`;

const UserHeaderInfoFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.4rem 4rem 0 27rem;
`;

const UserHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const UserHeaderSubInfo = styled.div``;

const UserHeaderInfoName = styled.h4`
  font-weight: 700;
`;
const UserHeaderInfoEmail = styled.h5`
  font-weight: 300;
`;
const UserHeaderInfoRole = styled.h5`
  font-weight: 300;
`;

const ProfileHeader = () => {
  const user = useSelector((state) => state.userState.user);

  const { profileImage, name, email, role } = user;

  if (user) {
    return (
      <>
        <ProfileHeaderCard>
          <ColoredDiv />
          <NormalDiv>
            <ProfileImageContainer>
              {profileImage ? <ProfileImage src={profileImage} /> : null}
            </ProfileImageContainer>
            <UserHeaderInfoFlexContainer>
              <UserHeaderInfo>
                <div>
                  <UserHeaderInfoName>{name}</UserHeaderInfoName>
                </div>
                <UserHeaderSubInfo>
                  <UserHeaderInfoEmail>{email}</UserHeaderInfoEmail>
                  <UserHeaderInfoRole>{role}</UserHeaderInfoRole>
                </UserHeaderSubInfo>
              </UserHeaderInfo>
              <Socials />
            </UserHeaderInfoFlexContainer>
          </NormalDiv>
        </ProfileHeaderCard>
        <Outlet context={[user]} />
      </>
    );
  } else {
    <h1>loading...</h1>;
  }
};

export default ProfileHeader;
