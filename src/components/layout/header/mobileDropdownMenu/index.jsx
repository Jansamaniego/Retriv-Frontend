import React from 'react';
import styled from 'styled-components';
import { StyledLink } from '../../../common';

const MobileDropdownMenuContainer = styled.nav`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.neutral.light};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const MobileDropdownMenuFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobileDropdownMenu = () => {
  return (
    <MobileDropdownMenuContainer>
      <MobileDropdownMenuFlexWrapper>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/register">Sign up!</StyledLink>
        <StyledLink to="/">Home</StyledLink>
      </MobileDropdownMenuFlexWrapper>
    </MobileDropdownMenuContainer>
  );
};

export default MobileDropdownMenu;
