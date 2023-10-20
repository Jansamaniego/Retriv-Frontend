import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/store';
import { StyledLink, ProfileImageLogo, Button } from 'components/common';
import { CartIcon, SearchIcon, StoreIcon, MobileMenuIcon } from 'assets/icons';
import CategoryFilterModal from 'components/category/categoryFilterModal';
import ThemeToggleButton from 'components/layout/header/themeToggleButton';
import ProfileDropdownMenu from 'components/layout/header/profileDropdownMenu';
import ShopPickerDropdownMenu from 'components/layout/header/shopPickerDropdownMenu';
import Search from 'components/layout/header/search';
import MobileDropdownMenu from 'components/layout/header/mobileDropdownMenu';
import MobileSearch from 'components/layout/header/mobileSearch';

interface ILogoContainerProps {
  isMobileSearchOpen: boolean;
}

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

const LogoContainer = styled.div<ILogoContainerProps>`
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
  const { pathname } = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userImageRef = useRef<HTMLImageElement>(null);
  const shopIconRef = useRef<HTMLDivElement>(null);
  const shopPickerDropdownRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLFormElement>(null);
  const { userShops } = useSelector((state: RootState) => state.shopState);
  const loggedInUser = useSelector((state: RootState) => state.userState.user);
  const cart = useSelector((state: RootState) => state.cartState.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryFilterModalOpen, setIsCategoryFilterModalOpen] =
    useState(false);
  const [isShopPickerDropdownMenuOpen, setIsShopPickerDropdownMenuOpen] =
    useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const userImageLogoClickhandler = () => {
    setIsProfileMenuOpen((value) => !value);
  };

  const shopIconClickHandler = () => {
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dropdownRef?.current?.contains(event.target as Element) &&
        !userImageRef?.current?.contains(event.target as Element)
      ) {
        closeProfileMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!mobileSearchRef?.current?.contains(event.target as Element)) {
        closeMobileSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [mobileSearchRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !shopIconRef?.current?.contains(event.target as Element) &&
        !shopPickerDropdownRef?.current?.contains(event.target as Element)
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
        <LogoContainer isMobileSearchOpen={isMobileSearchOpen}>
          <StyledLink to="/" isActive={pathname === '/'}>
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
                <StyledStyledLink to="/cart" isActive={pathname === '/cart'}>
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
              <StyledLink to="login" isActive={pathname === '/login'}>
                Log In
              </StyledLink>
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
          isModalOpen={isCategoryFilterModalOpen}
          closeModal={closeCategoryFilterModal}
        />
      )}
    </>
  );
};

export default Header;
