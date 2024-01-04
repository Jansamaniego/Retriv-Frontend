import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import { ProductPaginationProvider } from '../../context/ProductPaginationContext';
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import SideMenu from 'components/layout/sideMenu';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentFlex = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 9rem 1.6rem 0 1.6rem;
  /* height: calc(100vh - 9rem); */
`;

const OutletContainer = styled.div`
  width: 100%;
`;

const RootLayout = () => {
  return (
    <ProductPaginationProvider>
      <LayoutContainer>
        <Header />
        <ContentFlex>
          <SideMenu />
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
