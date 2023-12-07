import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/store';
import {
  DashBoardIcon,
  HomeIcon,
  SignupIcon,
  StoreIcon,
  UserIcon,
  ChevronUp,
  ChevronDown,
} from 'assets/icons';
import SideMenuCategoryFilter from 'components/layout/sideMenu/sideMenuCategoryFilter';
import MobileSideMenuCategoryFilter from 'components/layout/sideMenu/mobileSideMenuCategoryFilter';

interface IStyledMainMenuDropDownProps {
  onClick: () => void;
  to?: string;
}

const SideMenuMain = styled.aside`
  display: flex;
  flex-direction: column;
  max-width: 60ch;
  width: 100%;
  height: fit-content;

  padding: 2.4rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.neutral.background};
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 1300px) {
    padding: 0;
    max-width: 30ch;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const MenuLinkLabel = styled.h5`
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

  &:active {
    box-shadow: inset 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1300px) {
    flex-direction: column;
    gap: 0;
    padding: 2.4rem 3.2rem;
  }
`;

const SubMenuLink = styled(StyledMainMenuLink)`
  padding-left: 8.8rem;

  @media (max-width: 1300px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const SubMenuLinkLabel = styled.h5`
  font-weight: 300;
  white-space: nowrap;

  @media (max-width: 1300px) {
    font-size: 1.5rem;
  }
`;

const StyledMainMenuDropDown = styled.div<IStyledMainMenuDropDownProps>`
  text-decoration: none;
  color: ${(props) => props.theme.primary.main};
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 1.6rem 0.8rem;
  border-radius: 0.5rem;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.neutral[800]};
  }

  @media (max-width: 1300px) {
    flex-direction: column;
    gap: 0;
    padding: 2.4rem 3.2rem;
  }
`;

const DropDownIcon = styled.div`
  padding: 0 1rem;
`;

const MainLink = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: 1300px) {
    flex-direction: column;
    gap: 0;
  }
`;

const ProfileSubMenu: React.FC<{ userRole?: string }> = ({ userRole }) => {
  const currentUser = useSelector((state: RootState) => state.userState.user);

  return (
    <>
      <SubMenuLink to="profile">
        <SubMenuLinkLabel>User Info</SubMenuLinkLabel>
      </SubMenuLink>
      {!currentUser?.isGoogleAccount && (
        <SubMenuLink to="/profile/change-password">
          <SubMenuLinkLabel>Change Password</SubMenuLinkLabel>
        </SubMenuLink>
      )}
      {currentUser && !currentUser.isEmailVerified && (
        <SubMenuLink to="/profile/send-verification-email">
          <SubMenuLinkLabel> Verify Email</SubMenuLinkLabel>
        </SubMenuLink>
      )}
    </>
  );
};

const UserSubMenu: React.FC<{ userRole?: string }> = ({ userRole }) => {
  return (
    <>
      <SubMenuLink to="user-table">
        <SubMenuLinkLabel>User Table</SubMenuLinkLabel>
      </SubMenuLink>
      <SubMenuLink to="create-user">
        <SubMenuLinkLabel> Create User</SubMenuLinkLabel>
      </SubMenuLink>
    </>
  );
};

const SideMenu = () => {
  const loggedInUser = useSelector((state: RootState) => state.userState.user);

  const { pathname } = useLocation();

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
          <MenuLinkLabel>Home</MenuLinkLabel>
        </StyledMainMenuLink>
        <StyledMainMenuLink to="register">
          <SignupIcon width="3rem" />
          <MenuLinkLabel>Sign up!</MenuLinkLabel>
        </StyledMainMenuLink>
        {pathname === '/' && <SideMenuCategoryFilter />}
        <MobileSideMenuCategoryFilter />
      </SideMenuMain>
    );
  }

  const { role } = currentUser;

  return (
    <SideMenuMain>
      <StyledMainMenuLink to="/">
        <HomeIcon width="3rem" />
        <MenuLinkLabel>Home</MenuLinkLabel>
      </StyledMainMenuLink>
      {role === 'admin' && (
        <>
          <StyledMainMenuLink to="/admin-dashboard">
            <DashBoardIcon width="3rem" />
            <MenuLinkLabel>Dashboard</MenuLinkLabel>
          </StyledMainMenuLink>
          <StyledMainMenuDropDown
            onClick={() => setIsUserSubMenuOpen((value) => !value)}
          >
            <MainLink>
              <UserIcon width="3rem" />
              <MenuLinkLabel>Users</MenuLinkLabel>
            </MainLink>
            <DropDownIcon>
              {isUserSubMenuOpen ? (
                <ChevronDown width="2rem" />
              ) : (
                <ChevronUp width="2rem" />
              )}
            </DropDownIcon>
          </StyledMainMenuDropDown>
          {isUserSubMenuOpen && <UserSubMenu />}
          <StyledMainMenuLink to="/order-table">
            <DashBoardIcon width="3rem" />
            <MenuLinkLabel>Orders</MenuLinkLabel>
          </StyledMainMenuLink>
          <StyledMainMenuLink to="/category">
            <DashBoardIcon width="3rem" />
            <MenuLinkLabel>Categories</MenuLinkLabel>
          </StyledMainMenuLink>
        </>
      )}
      <StyledMainMenuDropDown
        onClick={() => setIsProfileSubMenuOpen((value) => !value)}
      >
        <MainLink>
          <UserIcon width="3rem" />
          <MenuLinkLabel>Profile</MenuLinkLabel>
        </MainLink>
        <DropDownIcon>
          {isProfileSubMenuOpen ? (
            <ChevronDown width="2rem" />
          ) : (
            <ChevronUp width="2rem" />
          )}
        </DropDownIcon>
      </StyledMainMenuDropDown>
      {isProfileSubMenuOpen && <ProfileSubMenu />}
      {role === 'seller' && (
        <StyledMainMenuLink to="/my-shop">
          <StoreIcon width="3rem" />
          <MenuLinkLabel>Manage Shop</MenuLinkLabel>
        </StyledMainMenuLink>
      )}
      {role === 'user' && (
        <StyledMainMenuLink to="/create-shop">
          <StoreIcon width="3rem" />
          <MenuLinkLabel>Start Selling!</MenuLinkLabel>
        </StyledMainMenuLink>
      )}
      {pathname === '/' && <SideMenuCategoryFilter />}
      <MobileSideMenuCategoryFilter />
    </SideMenuMain>
  );
};

export default SideMenu;
