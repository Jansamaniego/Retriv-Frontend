import React from 'react';
import styled from 'styled-components';

interface ContentFlexWrapperProps {
  justifyContent?: string;
  gap?: string;
  columnBreakPoint?: string;
  children?: React.ReactNode;
  alignItems?: string;
}

interface FlexWrapperProps {
  justifyContent?: string;
  gap?: string;
  columnBreakPoint?: string;
  alignItems?: string;
}

const ContentFlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FlexWrapper = styled.div<FlexWrapperProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  gap: ${(props) => props.gap};
  width: 100%;
  min-width: 70rem;
  max-width: 150rem;

  @media (max-width: ${(props) => props.columnBreakPoint}) {
    flex-direction: column;
    min-width: 30rem;
    max-width: 100rem;
  }
`;

export const ContentFlexWrapper: React.FC<ContentFlexWrapperProps> = ({
  children,
  justifyContent = 'flex-start',
  gap = 'clamp(1.6rem, 1.007rem + 1.58vw, 4.8rem)',
  columnBreakPoint = '1200px',
  ...props
}) => {
  return (
    <ContentFlexContainer>
      <FlexWrapper
        justifyContent={justifyContent}
        gap={gap}
        columnBreakPoint={columnBreakPoint}
        {...props}
      >
        {children}
      </FlexWrapper>
    </ContentFlexContainer>
  );
};
