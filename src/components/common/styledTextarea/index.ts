import { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

interface StyledTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const StyledTextarea = styled.textarea<StyledTextAreaProps>`
  padding: 0.4rem 0.8rem;
  border: 0.1rem solid ${(props) => props.theme.primary.main};
  border-radius: 0.5rem;
  font-size: 1.6rem;
  font-weight: 300;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-bottom: 0.8rem;
  width: 100%;
  min-height: 4rem;
  color: ${(props) => props.theme.neutral.text};
`;
