import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 75ch;
  background: white;
  border: 0.1rem solid ${(props) => props.theme.primaryLightGray};
  padding: 1.6rem;
  box-sizing: border-box;
  color: black;
  border-radius: 0.4rem;
`;
