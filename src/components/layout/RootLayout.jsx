import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';
import styled from 'styled-components';
import { ProductPaginationProvider } from '../../context/ProductPaginationContext';

const ContentFlex = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  margin: 9rem 2.4rem 0 2.4rem;
`;

const MainContentContainer = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MainContentFlex = styled.section`
  width: 95%;
`;

const RootLayout = () => {
  return (
    <>
      <ProductPaginationProvider>
        <Header />
        <ContentFlex>
          <SideMenu />
          <MainContentContainer>
            <MainContentFlex>
              <Outlet />
            </MainContentFlex>
          </MainContentContainer>
        </ContentFlex>
      </ProductPaginationProvider>
    </>
  );
};

export default RootLayout;
