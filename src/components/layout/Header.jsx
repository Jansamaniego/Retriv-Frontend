import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Link as ReactRouterDomLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, StyledLink } from '../common';
import { useLogoutUserMutation } from '../../redux/services/authApi';
import ThemeToggleButton from '../theme/ThemeToggleButton';
import ProfileImageLogo from '../profile/ProfileImageLogo';
import ProfileDropdownMenu from '../profile/ProfileDropdownMenu';
import { SearchIcon } from '../../assets/icons';

const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 2.4rem;
  z-index: 999;
  position: fixed;
  top: 0;
  background-color: ${(props) => props.theme.background.default};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  background-color: ${(props) => props.theme.neutral[900]};
  border-radius: 0.5rem;
  font-size: 2rem;
  width: 40%;
`;

const SearchInput = styled.input`
  width: 95%;
  border: none;
  padding: 0 1.6rem;
  border-radius: 0.5rem;
  min-height: 4rem;
`;

const SearchIconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.nav`
  display: ${(props) => (props.open ? 'block' : 'none')};
  /* position: absolute; */
  width: 100%;
  top: 6rem;
  left: 0;
  padding: 0.8rem;
  box-sizing: border-box;
  border-bottom: 0.3rem solid ${(props) => props.theme.primary.main};
  background: ${(props) => props.theme.neutral.main};

  @media (min-width: 768px) {
    display: flex;
    background: none;
    left: initial;
    top: initial;
    border-bottom: none;
    width: initial;
  }
`;

const MenuFlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
`;

const MobileMenuIcon = styled.div`
  margin: auto 0 auto auto;
  width: 2.5rem;
  min-width: 2.5rem;
  padding: 2.5rem;
  > div {
    height: 0.3rem;
    background: ${(props) => props.theme.primary[600]};
    margin: 0.5rem;
    width: 100%;
  }

  @media (min-width: 76.8em) {
    display: none;
  }
`;

const Header = () => {
  const theme = useSelector((state) => state.themeState.theme);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.userState.user);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const userImageLogoClickhandler = () => {
    setIsProfileMenuOpen((value) => !value);
  };

  return (
    <HeaderWrapper>
      <MobileMenuIcon onClick={() => setMenuOpen((s) => !s)}>
        <div />
        <div />
        <div />
      </MobileMenuIcon>
      <LogoContainer>
        <StyledLink to="/">
          <h1>Retriv</h1>
        </StyledLink>
      </LogoContainer>
      <SearchBar>
        <SearchInput />
        <SearchIconButton>
          <SearchIcon width="2rem" />
        </SearchIconButton>
      </SearchBar>
      <Menu open={menuOpen}>
        <MenuFlexContainer>
          <ThemeToggleButton />
          {loggedInUser ? (
            <>
              <ProfileImageLogo
                profileImage={loggedInUser.profileImage}
                onClick={userImageLogoClickhandler}
              />
            </>
          ) : (
            <StyledLink to="login">Log In</StyledLink>
          )}
        </MenuFlexContainer>
      </Menu>
      {loggedInUser ? (
        <ProfileDropdownMenu
          isProfileMenuOpen={isProfileMenuOpen}
          user={loggedInUser}
        />
      ) : null}
    </HeaderWrapper>
  );
};

export default Header;
