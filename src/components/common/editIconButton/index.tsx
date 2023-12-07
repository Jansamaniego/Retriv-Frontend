import { EditIcon } from 'assets/icons';
import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const EditButton = styled.button`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  background: none;
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral.text};
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  bottom: 1.5rem;

  &:hover {
    color: ${(props) => props.theme.neutral[500]};
  }
`;

export const EditIconButton = (props: Props) => {
  return (
    <EditButton {...props}>
      <EditIcon />
    </EditButton>
  );
};
