import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import SideMenu from './sideMenu';
import styled from 'styled-components';
import { ProductPaginationProvider } from '../../context/ProductPaginationContext';

const ContentFlex = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  margin-top: 9rem;
  margin: 9rem auto 0 auto;
  padding: 0 1.6rem;
`;

const OutletContainer = styled.div`
  width: 100%;
`;

const RootLayout = () => {
  return (
    <ProductPaginationProvider>
      <Header />
      <ContentFlex>
        <SideMenu />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </ContentFlex>
    </ProductPaginationProvider>
  );
};

export default RootLayout;
