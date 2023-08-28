import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import SideMenu from './sideMenu';
import styled from 'styled-components';
import { ProductPaginationProvider } from '../../context/ProductPaginationContext';

const OutletContainer = styled.div`
  width: 100%;
`;

const ContentFlex = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  margin-top: 9rem;
  padding: 0 1.6rem;
  width: 100%;

  @media (max-width: 1200px) {
  }

  @media (max-width: 992px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 360px) {
    width: 1000px;
  }
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
