import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Link as ReactRouterDomLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { StyledLink, ProfileImageLogo } from '../../common';
import { useLogoutUserMutation } from '../../../redux/services/authApi/authApi';
import ThemeToggleButton from './themeToggleButton';
import ProfileDropdownMenu from './profileDropdownMenu';
import Search from './search';
import { CartIcon, SearchIcon, StoreIcon } from '../../../assets/icons';
import ShopPickerDropdownMenu from '../../shop/ShopPickerDropdownMenu';
import MobileMenuIcon from '../../../assets/icons/mobileMenuIcon';
import MobileDropdownMenu from './mobileDropdownMenu';
import CategoryFilterModal from '../sideMenu/mobileSideMenuCategoryFilter/categoryFIlterModal';
import { Button } from 'semantic-ui-react';
import MobileSearch from './mobileSearch';

const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 2.4rem;
  z-index: 999;
  position: fixed;
  top: 0;
  background-color: ${(props) => props.theme.background.default};
`;

const MobileMenuIconContainer = styled.div`
  display: none;

  align-items: center;

  @media (max-width: 600px) {
    display: flex;
  }
`;

const StyledMobileMenuIcon = styled(MobileMenuIcon)`
  cursor: pointer;
  padding: 0.8rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    display: ${({ isMobileSearchOpen }) =>
      isMobileSearchOpen ? 'none' : 'flex'};
  }
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

const MobileSearchToggleButton = styled(Button)`
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 5rem;
  height: 5rem;

  @media (max-width: 600px) {
    display: ${({ isMobileSearchOpen }) =>
      isMobileSearchOpen ? 'none' : 'flex'};
  }
`;

const StyledSearchIcon = styled(SearchIcon)``;

const Menu = styled.nav`
  display: flex;
  /* position: absolute; */
  width: 100%;
  padding: 0.8rem;
  background: none;
  left: initial;
  top: initial;
  border-bottom: none;
  width: initial;

  @media (max-width: 600px) {
    display: none;
  }
`;

const MenuFlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
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

// const MobileMenuIcon = styled.div`
//   display: none;
//   margin: auto 0 auto auto;
//   width: 2.5rem;
//   min-width: 2.5rem;
//   padding: 2.5rem;

//   & div {
//     height: 1rem;
//     background: ${(props) => props.theme.primary[600]};
//     margin: 0.5rem;
//     width: 100%;
//   }

//   @media (max-width: 360px) {
//     display: block;
//   }
// `;

const Header = () => {
  const dropdownRef = useRef();
  const userImageRef = useRef();
  const shopIconRef = useRef();
  const shopPickerDropdownRef = useRef();
  const mobileSearchRef = useRef();
  const { userShops, currentShop } = useSelector((state) => state.shopState);
  const cart = useSelector((state) => state.cartState.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryFilterModalOpen, setIsCategoryFilterModalOpen] =
    useState(false);
  const [isShopPickerDropdownMenuOpen, setIsShopPickerDropdownMenuOpen] =
    useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.userState.user);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const userImageLogoClickhandler = () => {
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

  const showCategoryFilterModal = () => {
    setIsMobileMenuOpen(false);
    setIsCategoryFilterModalOpen(true);
  };

  const closeCategoryFilterModal = () => {
    setIsCategoryFilterModalOpen(false);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
  };

  const openMobileSearch = () => {
    setIsMobileSearchOpen(true);
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
      if (!mobileSearchRef?.current?.contains(event.target)) {
        closeMobileSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [mobileSearchRef]);

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
    <>
      <HeaderWrapper>
        <MobileMenuIconContainer onClick={() => setIsMobileMenuOpen((s) => !s)}>
          <StyledMobileMenuIcon width="5rem" />
        </MobileMenuIconContainer>
        <LogoContainer
          isMobileSearchOpen={isMobileSearchOpen}
          // onClick={navigateHome}
        >
          <StyledLink to="/">
            <h1>Retriv</h1>
          </StyledLink>
        </LogoContainer>
        <Search />
        <MobileSearch
          isMobileSearchOpen={isMobileSearchOpen}
          ref={mobileSearchRef}
        />
        <MobileSearchToggleButton
          type="button"
          isMobileSearchOpen={isMobileSearchOpen}
        >
          <StyledSearchIcon width="2rem" onClick={openMobileSearch} />
        </MobileSearchToggleButton>
        <Menu>
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
        {isMobileMenuOpen && (
          <MobileDropdownMenu
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            showCategoryFilterModal={showCategoryFilterModal}
          />
        )}
      </HeaderWrapper>
      {isCategoryFilterModalOpen && (
        <CategoryFilterModal
          showModal={showCategoryFilterModal}
          closeModal={closeCategoryFilterModal}
        />
      )}
    </>
  );
};

export default Header;
