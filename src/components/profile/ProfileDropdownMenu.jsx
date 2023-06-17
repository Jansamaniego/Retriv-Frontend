import React from 'react';
import styled from 'styled-components';
import { StyledLink } from '../common';

const ProfileDropdownMenuContainer = styled.div`
  max-width: 30rem;
  width: 100%;
  position: absolute;
  display: ${(props) => (props.isProfileMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.neutral[900]};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  right: 1rem;
  top: 5.8rem;
`;

const ProfileSectionContainer = styled.div`
  padding: 1.6rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.neutral[0]};
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
`;

const ProfileImageLogoContainer = styled.div`
  max-width: 4rem;
  position: relative;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  cursor: pointer;

  &:active {
    outline: 0.1rem solid ${(props) => props.theme.neutral.main};
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  & h5 {
    font-weight: 400;
  }
`;

const MenuLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.4rem 0.4rem;
`;

const ProfileDropdownMenu = ({ isProfileMenuOpen, user }) => {
  const { profileImage, name, email} = user;
  return (
    <ProfileDropdownMenuContainer isProfileMenuOpen={isProfileMenuOpen}>
      <ProfileSectionContainer>
        <ProfileSection>
          <ProfileImageLogoContainer>
            <ProfileImage src={profileImage} />
          </ProfileImageLogoContainer>
          <UserInfo>
            <h5>{name}</h5>
            <h5>{email}</h5>
            <StyledLink>Manage your account</StyledLink>
          </UserInfo>
        </ProfileSection>
      </ProfileSectionContainer>
      <MenuLinksContainer>
        <StyledLink>Your Profile</StyledLink>
        <StyledLink>Your Shops</StyledLink>
        <StyledLink>Admin Dashboard</StyledLink>
        <StyledLink>Log out</StyledLink>
      </MenuLinksContainer>
    </ProfileDropdownMenuContainer>
  );
};

export default ProfileDropdownMenu;
