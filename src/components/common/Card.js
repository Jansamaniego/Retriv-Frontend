import styled from 'styled-components';

export const Card = styled.div`
  border: 0.1rem solid ${(props) => props.theme.neutral[900]};
  background-color: ${(props) => props.theme.neutral[900]};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 2rem;
`;
