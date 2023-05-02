import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Content = styled.main`
  max-width: 800px;
  margin: 80px auto 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
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
