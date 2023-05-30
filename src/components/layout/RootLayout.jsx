import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Content = styled.main`
  max-width: 275ch;
  margin: 8rem auto 0 auto;
  padding: 0 1.6rem;
`;

const RootLayout = (props) => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

export default RootLayout;
