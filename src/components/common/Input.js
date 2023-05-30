import styled from 'styled-components';

export const Input = styled.input`
  padding: 0.4rem 0.8rem;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.4rem;
  font-size: 1.6rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-bottom: 0.8rem;
  width: 100%;
  min-height: 4rem;
`;
