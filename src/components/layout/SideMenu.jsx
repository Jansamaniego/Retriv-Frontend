import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  DashBoardIcon,
  HomeIcon,
  SignupIcon,
  UserIcon,
} from '../../assets/icons';
import { ChevronUp } from '../../assets/icons/ChevronUp';
import { ChevronDown } from '../../assets/icons/ChevronDown';
import { useEffect } from 'react';
import CategorySideMenuFilter from '../category/CategorySideMenuFilter';

const SideMenuMain = styled.aside`
  display: flex;
  flex-direction: column;
  max-width: 60ch;
  width: 100%;
  padding: 2.4rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.neutral.background};
  /* min-height: 120rem; */
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
`;

const StyledMainMenuLink = styled(Link)`
  font-size: 2rem;
  font-weight: 400;
  text-decoration: none;
  color: ${(props) => props.theme.primary.main};
  display: flex;
  gap: 4rem;
  padding: 1.6rem 0.8rem;
  border-radius: 0.5rem;

  & h5 {
    font-weight: 400;
  }

  &:hover {
    background-color: ${(props) => props.theme.neutral[800]};
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
          Home
        </StyledMainMenuLink>
        <StyledMainMenuLink to="register">
          <SignupIcon width="3rem" />
          Sign up now!
        </StyledMainMenuLink>
        <CategorySideMenuFilter />
      </SideMenuMain>
    );
  }

  const { role } = currentUser;

  return (
    <SideMenuMain>
      <StyledMainMenuLink to="/">
        <HomeIcon width="3rem" /> Home
      </StyledMainMenuLink>
      {role === 'admin' && (
        <>
          <StyledMainMenuLink to="/admin-dashboard">
            <DashBoardIcon width="3rem" />
            Dashboard
          </StyledMainMenuLink>
          {/* <StyledMainMenuLink to="/user-table">
            <DashBoardIcon width="3rem" />
            Users
          </StyledMainMenuLink> */}
          <StyledMainMenuLinkWithDropDown
            onClick={() => setIsUserSubMenuOpen((value) => !value)}
          >
            <MainLink>
              <UserIcon width="3rem" />
              Users
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
            Orders
          </StyledMainMenuLink>
          <StyledMainMenuLink to="/category">
            <DashBoardIcon width="3rem" />
            Categories
          </StyledMainMenuLink>
        </>
      )}
      <StyledMainMenuLinkWithDropDown
        onClick={() => setIsProfileSubMenuOpen((value) => !value)}
      >
        <MainLink>
          <UserIcon width="3rem" />
          Profile
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
        <StyledMainMenuLink to="/my-shop">Manage Shop</StyledMainMenuLink>
      )}
      {role === 'user' && (
        <StyledMainMenuLink to="/create-shop">
          Start Selling!
        </StyledMainMenuLink>
      )}
      <CategorySideMenuFilter />
    </SideMenuMain>
  );
};

export default SideMenu;
