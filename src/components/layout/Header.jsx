import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Link as ReactRouterDomLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StyledLink } from '../common';
import { useLogoutUserMutation } from '../../redux/services/authApi';
import ThemeToggleButton from '../theme/ThemeToggleButton';
import ProfileImageLogo from '../profile/ProfileImageLogo';
import ProfileDropdownMenu from '../profile/ProfileDropdownMenu';
import Search from './Search';
import { CartIcon } from '../../assets/icons';

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

const StyledStyledLink = styled(StyledLink)`
  position: relative;
`;

const CartItemQuantity = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.primary.main};
  color: ${(props) => props.theme.neutral[900]};
  top: -0.1rem;
  right: 0.4rem;
  border-radius: 50%;
  width: 2rem;
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

const Header = ({ setSearchParams }) => {
  const cart = useSelector((state) => state.cartState.cart);
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
      <Search setSearchParams={setSearchParams} />
      <Menu open={menuOpen}>
        <MenuFlexContainer>
          {loggedInUser ? (
            <StyledStyledLink to="/payment-test">payment test</StyledStyledLink>
          ) : null}
          <ThemeToggleButton />
          {loggedInUser ? (
            <StyledStyledLink to="/cart">
              <CartIcon width="4rem" strokeWidth="2" />
              {cart ? (
                <CartItemQuantity>{cart.items.length}</CartItemQuantity>
              ) : null}
            </StyledStyledLink>
          ) : null}
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
