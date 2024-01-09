import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { ProductPaginationProvider } from '../../context/ProductPaginationContext';
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import SideMenu from 'components/layout/sideMenu';

interface LayoutContainerProps {
  onClick: MouseEventHandler<HTMLDivElement>;
}

const LayoutContainer = styled.div<LayoutContainerProps>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentFlex = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 9rem 1.6rem 0 1.6rem;
`;

const OutletContainer = styled.div`
  width: 100%;
`;

const RootLayout = () => {
  const location = useLocation();
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const barsIconContainerRef = useRef<HTMLDivElement>(null);
  const { pathname } = location;

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(pathname === '/');
  const [isHome, setIsHome] = useState(pathname === '/');
  const [isFromHome, setIsFromHome] = useState(pathname === '/');

  const toggleSideMenu = () => {
    setIsSideMenuOpen((v) => !v);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !sideMenuRef?.current?.contains(event.target as Element) &&
      !barsIconContainerRef?.current?.contains(event.target as Element) &&
      !isHome
    ) {
      closeSideMenu();
    }
  };

  useEffect(() => {
    if (isFromHome) {
      setIsSideMenuOpen(false);
    }
    if (pathname === '/') {
      setIsSideMenuOpen(true);
      setIsFromHome(true);
    } else {
      setIsFromHome(false);
    }
    setIsHome(
      pathname === '/' ||
        pathname.startsWith('/category') ||
        (pathname.split('/').includes('shop') &&
          !pathname.split('/').includes('product'))
    );
  }, [pathname]);

  return (
    <ProductPaginationProvider>
      <LayoutContainer onClick={handleClickOutside}>
        <Header toggleSideMenu={toggleSideMenu} ref={barsIconContainerRef} />
        <ContentFlex>
          {isSideMenuOpen && (
            <SideMenu
              isAbsolute={!isHome}
              closeSideMenu={closeSideMenu}
              ref={sideMenuRef}
            />
          )}
          <OutletContainer>
            <Outlet />
          </OutletContainer>
        </ContentFlex>
        <Footer />
      </LayoutContainer>
    </ProductPaginationProvider>
  );
};

export default RootLayout;
