import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { IUser } from 'types';
import { useLogoutUserMutation } from 'redux/services/authApi/authApi';
import { StyledLink, ProfileImageLogo } from 'components/common';

interface IProfileDropdownMenuProps {
  isProfileMenuOpen: boolean;
  user: IUser;
  closeProfileMenu: () => void;
}

interface IProfileDropdownMenuContainerProps {
  isProfileMenuOpen: boolean;
}

const ProfileDropdownMenuContainer = styled.div<IProfileDropdownMenuContainerProps>`
  max-width: fit-content;
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

const ProfileDropdownMenuOption = styled.div`
  font-size: 1.6rem;
  padding: 0.4rem 0.8rem;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  color: ${(props) => props.theme.neutral.text};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.neutral.light};
  }

  &:active {
    color: ${(props) => props.theme.neutral.main};
  }
`;

const ProfileDropDownMenuText = styled.h6`
  color: ${(props) => props.theme.neutral.text};
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

const ProfileDropdownMenu = forwardRef<
  HTMLDivElement,
  IProfileDropdownMenuProps
>(({ isProfileMenuOpen, user }, ref) => {
  const navigate = useNavigate();
  const [logout] = useLogoutUserMutation();
  const { pathname } = useLocation();

  const { profileImage, firstName, lastName, email, role } = user;

  const logoutOnClickHandler = async () => {
    await logout(null);
    navigate('/');
  };

  return (
    <ProfileDropdownMenuContainer
      isProfileMenuOpen={isProfileMenuOpen}
      ref={ref}
    >
      <ProfileSectionContainer>
        <ProfileSection>
          <ProfileImageLogo profileImage={profileImage} size="6rem" />
          <UserInfo>
            <ProfileDropDownMenuText>
              {firstName} {lastName}
            </ProfileDropDownMenuText>
            <ProfileDropDownMenuText>{email}</ProfileDropDownMenuText>
            <StyledLink to="/profile" isActive={pathname === '/profile'}>
              Manage your account
            </StyledLink>
          </UserInfo>
        </ProfileSection>
      </ProfileSectionContainer>
      <MenuLinksContainer>
        <StyledLink to="/profile" isActive={pathname === '/profile'}>
          My Profile
        </StyledLink>
        <StyledLink to="/my-orders" isActive={pathname === '/my-orders'}>
          Orders
        </StyledLink>
        {role === 'admin' && (
          <ProfileDropdownMenuOption>Admin Dashboard</ProfileDropdownMenuOption>
        )}
        <ProfileDropdownMenuOption onClick={logoutOnClickHandler}>
          Log out
        </ProfileDropdownMenuOption>
      </MenuLinksContainer>
    </ProfileDropdownMenuContainer>
  );
});

export default ProfileDropdownMenu;
