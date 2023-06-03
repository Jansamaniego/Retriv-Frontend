import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as ReactRouterDomLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setTheme } from '../../redux/features/themeSlice';
import { Button, StyledLink } from '../common';
import { useLogoutUserMutation } from '../../redux/services/authApi';
import Cookies from 'js-cookie';

const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  display: flex;
  padding: 0 1.6rem;
  position: fixed;
  top: 0;
`;

const Menu = styled.nav`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  top: 6rem;
  left: 0;
  padding: 0.8rem;
  box-sizing: border-box;
  border-bottom: 0.3rem solid ${(props) => props.theme.secondary};
  background: ${(props) => props.theme.offWhite};

  @media (min-width: 768px) {
    display: flex;
    background: none;
    left: initial;
    top: initial;
    margin: auto 0 auto auto;
    border-bottom: none;
    position: relative;
    width: initial;
  }
`;

const MobileMenuIcon = styled.div`
  margin: auto 0 auto auto;
  width: 2.5rem;
  min-width: 2.5rem;
  padding: 2.5rem;
  > div {
    height: 0.3rem;
    background: ${(props) => props.theme.offBlack};
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
  const loggedInUser = useSelector((state) => state.userState.user);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const isLoggedIn = Cookies.get('logged_in');

  return (
    <HeaderWrapper>
      <MobileMenuIcon onClick={() => setMenuOpen((s) => !s)}>
        <div />
        <div />
        <div />
      </MobileMenuIcon>
      <Menu open={menuOpen}>
        <StyledLink to="/" isActive={pathname === '/'}>
          Home
        </StyledLink>
        <StyledLink to="admin" isActive={pathname === '/admin'}>
          Admin
        </StyledLink>
        <StyledLink to="/my-profile" isActive={pathname === '/my-profile'}>
          My Profile
        </StyledLink>
        <Button
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}
        >
          Toggle Theme
        </Button>
        {loggedInUser ? (
          <Button onClick={logoutUser} disabled={isLoading}>
            Logout
          </Button>
        ) : (
          <StyledLink to="/login" isActive={pathname === '/login'}>
            Login
          </StyledLink>
        )}
      </Menu>
    </HeaderWrapper>
  );
};

export default Header;
