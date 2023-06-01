import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Content = styled.main`
  max-width: 1000ch;
  width: 97%;
  margin: 8rem auto 0 auto;
  display: flex;
  justify-content: center;
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
