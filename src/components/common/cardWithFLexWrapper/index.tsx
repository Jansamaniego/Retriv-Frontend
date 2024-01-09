import React from 'react';
import styled from 'styled-components';
import { Card } from '../card';

interface CardWithFlexWrapperProps {
  children: React.ReactNode;
}

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  width: 150rem;
`;

export const CardWithFlexWrapper: React.FC<CardWithFlexWrapperProps> = ({
  children,
}) => {
  return (
    <FlexWrapper>
      <StyledCard>{children}</StyledCard>
    </FlexWrapper>
  );
};
