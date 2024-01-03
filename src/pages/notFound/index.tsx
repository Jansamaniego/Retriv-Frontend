import styled from 'styled-components';

const NotFoundText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

export const NotFound = () => {
  return <NotFoundText>Page not found!</NotFoundText>;
};
