import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  DashBoardIcon,
  HomeIcon,
  SignupIcon,
  StoreIcon,
  UserIcon,
  ChevronUp,
  ChevronDown,
} from '../../../assets/icons';
import SideMenuCategoryFilter from './sideMenuCategoryFilter';
import MobileSideMenuCategoryFilter from './mobileSideMenuCategoryFilter';

const SideMenuMain = styled.aside`
  display: flex;
  flex-direction: column;
  max-width: 60ch;

  padding: 2.4rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.neutral.background};
  /* min-height: 120rem; */
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 1300px) {
    padding: 0;
  }

  @media (max-width: 360px) {
    display: none;
  }
`;

const MenuButtonLabel = styled.h5`
  font-weight: 400;
  white-space: nowrap;
  @media (max-width: 1300px) {
    font-size: 1.5rem;
  }
`;

const StyledMainMenuLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.primary.main};
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 1.6rem 0.8rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.neutral[800]};
  }

  @media (max-width: 1300px) {
    flex-direction: column;
    gap: 0;
    padding: 2.4rem 3.2rem;
  }
`;

const SubMenuLink = styled(StyledMainMenuLink)`
  padding-left: 8.8rem;
`;

const StyledMainMenuLinkWithDropDown = styled(StyledMainMenuLink)`
  justify-content: space-between;
  align-items: center;
`;

const DropDownIcon = styled.div`
  padding: 0 1rem;
`;

const MainLink = styled.div`
  display: flex;
  gap: 4rem;
`;

const ProfileSubMenu = ({ userRole }) => {
  const currentUser = useSelector((state) => state.userState.user);

  return (
    <>
      <SubMenuLink to="profile">User Info</SubMenuLink>
      <SubMenuLink to="/profile/change-password">Change Password</SubMenuLink>
      {currentUser && !currentUser.isEmailVerified && (
        <SubMenuLink to="/profile/send-verification-email">
          Verify Email
        </SubMenuLink>
      )}
    </>
  );
};

const UserSubMenu = ({ userRole }) => {
  return (
    <>
      <SubMenuLink to="user-table">User Table</SubMenuLink>
      <SubMenuLink to="create-user">Create User</SubMenuLink>
    </>
  );
};

const SideMenu = () => {
  const loggedInUser = useSelector((state) => state.userState.user);

  const [currentUser, setCurrentUser] = useState(loggedInUser);
  const [isProfileSubMenuOpen, setIsProfileSubMenuOpen] = useState(false);
  const [isUserSubMenuOpen, setIsUserSubMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(loggedInUser);
  }, [loggedInUser]);

  if (!currentUser) {
    return (
      <SideMenuMain>
        <StyledMainMenuLink to="/">
          <HomeIcon width="3rem" />
          <MenuButtonLabel>Home</MenuButtonLabel>
        </StyledMainMenuLink>
        <StyledMainMenuLink to="register">
          <SignupIcon width="3rem" />
          <MenuButtonLabel>Sign up!</MenuButtonLabel>
        </StyledMainMenuLink>
        <SideMenuCategoryFilter />
        <MobileSideMenuCategoryFilter />
      </SideMenuMain>
    );
  }

  const { role } = currentUser;

  return (
    <SideMenuMain>
      <StyledMainMenuLink to="/">
        <HomeIcon width="3rem" />
        <MenuButtonLabel>Home</MenuButtonLabel>
      </StyledMainMenuLink>
      {role === 'admin' && (
        <>
          <StyledMainMenuLink to="/admin-dashboard">
            <DashBoardIcon width="3rem" />
            <MenuButtonLabel>Dashboard</MenuButtonLabel>
          </StyledMainMenuLink>
          <StyledMainMenuLinkWithDropDown
            onClick={() => setIsUserSubMenuOpen((value) => !value)}
          >
            <MainLink>
              <UserIcon width="3rem" />
              <MenuButtonLabel>Users</MenuButtonLabel>
            </MainLink>
            <DropDownIcon>
              {isUserSubMenuOpen ? (
                <ChevronDown width="2rem" />
              ) : (
                <ChevronUp width="2rem" />
              )}
            </DropDownIcon>
          </StyledMainMenuLinkWithDropDown>
          {isUserSubMenuOpen && <UserSubMenu />}
          <StyledMainMenuLink to="/order-table">
            <DashBoardIcon width="3rem" />
            <MenuButtonLabel>Orders</MenuButtonLabel>
          </StyledMainMenuLink>
          <StyledMainMenuLink to="/category">
            <DashBoardIcon width="3rem" />
            <MenuButtonLabel>Categories</MenuButtonLabel>
          </StyledMainMenuLink>
        </>
      )}
      <StyledMainMenuLinkWithDropDown
        onClick={() => setIsProfileSubMenuOpen((value) => !value)}
      >
        <MainLink>
          <UserIcon width="3rem" />
          <MenuButtonLabel>Profile</MenuButtonLabel>
        </MainLink>
        <DropDownIcon>
          {isProfileSubMenuOpen ? (
            <ChevronDown width="2rem" />
          ) : (
            <ChevronUp width="2rem" />
          )}
        </DropDownIcon>
      </StyledMainMenuLinkWithDropDown>
      {isProfileSubMenuOpen && <ProfileSubMenu />}
      {role === 'seller' && (
        <StyledMainMenuLink to="/my-shop">
          <StoreIcon width="3rem" />
          <MenuButtonLabel>Manage Shop</MenuButtonLabel>
        </StyledMainMenuLink>
      )}
      {role === 'user' && (
        <StyledMainMenuLink to="/create-shop">
          <StoreIcon width="3rem" />
          <MenuButtonLabel>Start Selling!</MenuButtonLabel>
        </StyledMainMenuLink>
      )}
      <SideMenuCategoryFilter />
      <MobileSideMenuCategoryFilter />
    </SideMenuMain>
  );
};

export default SideMenu;
