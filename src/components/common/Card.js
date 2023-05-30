import styled from 'styled-components';

export const Card = styled.div`
  border: 0.4rem solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.primaryLightGray};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
`;
