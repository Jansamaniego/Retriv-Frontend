import React from 'react';
import styled from 'styled-components';
import { Card } from '../card';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: none;
`;

const TransparentPopupFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const TransparentPopup = ({ children }) => {
  return (
    <Background>
      <StyledCard>
        <TransparentPopupFlexWrapper>{children}</TransparentPopupFlexWrapper>
      </StyledCard>
    </Background>
  );
};
