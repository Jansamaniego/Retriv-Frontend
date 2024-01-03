import styled from 'styled-components';

const UnauthorizedText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

export const Unauthorized = () => {
  return (
    <UnauthorizedText>
      You are not authorized to view this page.
    </UnauthorizedText>
  );
};
