import { FormHTMLAttributes } from 'react';
import styled from 'styled-components';

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form = styled.form<IFormProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 75ch;
  background: ${(props) => props.theme.neutral[900]};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  padding: 1.6rem;
  color: ${(props) => props.theme.neutral.text};
  border-radius: 0.5rem;
`;
