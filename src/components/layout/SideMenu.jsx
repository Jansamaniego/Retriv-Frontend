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

const SideMenuMain = styled.aside`
  display: flex;
  flex-direction: column;
  max-width: 60ch;
  width: 100%;
  padding: 2.4rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.primary.main};
  min-height: 120rem;
`;

const StyledMainMenuLink = styled(Link)`
  font-size: 2rem;
  font-weight: 400;
  text-decoration: none;
  color: ${(props) => props.theme.neutral[900]};
  display: flex;
  gap: 4rem;
  padding: 1.6rem 0.8rem;
  border-radius: 0.5rem;

  & h5 {
    font-weight: 400;
  }

  &:hover {
    background-color: ${(props) => props.theme.primary[600]};
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
  return (
    <>
      <SubMenuLink to="profile">User Info</SubMenuLink>
      <SubMenuLink to="/profile/change-password">Change Password</SubMenuLink>
      <SubMenuLink to="/profile/send-verification-email">
        Verify Email
      </SubMenuLink>
    </>
  );
};

const SideMenu = () => {
  const loggedInUser = useSelector((state) => state.userState.user);

  const [isProfileSubMenuOpen, setIsProfileSubMenuOpen] = useState(false);

  if (!loggedInUser) {
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
      </SideMenuMain>
    );
  }

  const { role } = loggedInUser;

  return (
    <SideMenuMain>
      <StyledMainMenuLink to="/">
        <HomeIcon width="3rem" /> Home
      </StyledMainMenuLink>

      {role === 'admin' ? (
        <StyledMainMenuLink to="/">
          <DashBoardIcon width="3rem" />
          Dashboard
        </StyledMainMenuLink>
      ) : null}

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

      {isProfileSubMenuOpen ? <ProfileSubMenu /> : null}

      {role === 'seller' ? (
        <StyledMainMenuLink>Shops</StyledMainMenuLink>
      ) : role === 'user' ? (
        <StyledMainMenuLink>Start Selling!</StyledMainMenuLink>
      ) : null}
    </SideMenuMain>
  );
};

export default SideMenu;
