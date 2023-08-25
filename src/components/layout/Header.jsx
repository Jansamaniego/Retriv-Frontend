import React, { useRef, useState, useEffect } from 'react';
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
import { CartIcon, StoreIcon } from '../../assets/icons';
import ShopPickerDropdownMenu from '../shop/ShopPickerDropdownMenu';

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

const IconsFlexWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const StoreIconContainer = styled.div`
  position: relative;
  padding: 0.4rem 0.8rem 0 0.8rem;
  display: inline-block;
  color: ${(props) => props.theme.neutral.text};
  cursor: pointer;
`;

const StyledStoreIcon = styled(StoreIcon)`
  &:hover {
    color: ${(props) => props.theme.neutral.light};
  }

  &:active {
    color: ${(props) => props.theme.neutral.main};
  }
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
  padding: 0.6rem 0.8rem 0 0.8rem;
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
  const dropdownRef = useRef();
  const userImageRef = useRef();
  const shopIconRef = useRef();
  const shopPickerDropdownRef = useRef();
  const { userShops, currentShop } = useSelector((state) => state.shopState);
  const cart = useSelector((state) => state.cartState.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isShopPickerDropdownMenuOpen, setIsShopPickerDropdownMenuOpen] =
    useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.userState.user);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const userImageLogoClickhandler = (event) => {
    setIsProfileMenuOpen((value) => !value);
  };

  const shopIconClickHandler = (event) => {
    setIsShopPickerDropdownMenuOpen((value) => !value);
  };

  const closeShopPickerDropdownMenu = () => {
    setIsShopPickerDropdownMenuOpen(false);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !dropdownRef?.current?.contains(event.target) &&
        !userImageRef?.current?.contains(event.target)
      ) {
        closeProfileMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !shopIconRef?.current?.contains(event.target) &&
        !shopPickerDropdownRef?.current?.contains(event.target)
      ) {
        closeShopPickerDropdownMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

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
          <ThemeToggleButton />
          {loggedInUser && (
            <IconsFlexWrapper>
              {loggedInUser.role === 'seller' && userShops.length !== 0 && (
                <StoreIconContainer
                  onClick={shopIconClickHandler}
                  ref={shopIconRef}
                >
                  <StyledStoreIcon width="4rem" strokeWidth="2" />
                  {isShopPickerDropdownMenuOpen && (
                    <ShopPickerDropdownMenu ref={shopPickerDropdownRef} />
                  )}
                </StoreIconContainer>
              )}
              <StyledStyledLink to="/cart">
                <CartIcon width="4rem" strokeWidth="2" />{' '}
                <CartItemQuantity>
                  {cart ? cart.items.length : 0}
                </CartItemQuantity>
              </StyledStyledLink>
            </IconsFlexWrapper>
          )}
          {loggedInUser ? (
            <ProfileImageLogo
              profileImage={loggedInUser.profileImage}
              onClick={userImageLogoClickhandler}
              ref={userImageRef}
            />
          ) : (
            <StyledLink to="login">Log In</StyledLink>
          )}
        </MenuFlexContainer>
      </Menu>
      {loggedInUser && (
        <ProfileDropdownMenu
          isProfileMenuOpen={isProfileMenuOpen}
          closeProfileMenu={closeProfileMenu}
          user={loggedInUser}
          ref={dropdownRef}
        />
      )}
    </HeaderWrapper>
  );
};

export default Header;
