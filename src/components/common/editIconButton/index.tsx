import { EditIcon } from 'assets/icons';
import React, { ButtonHTMLAttributes, SVGProps } from 'react';
import styled from 'styled-components';

interface EditIconButtonProps {
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  svgProps?: SVGProps<SVGSVGElement>;
}

const EditButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral.text};
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.neutral[500]};
  }
`;

export const EditIconButton = ({
  buttonProps,
  svgProps,
}: EditIconButtonProps) => {
  return (
    <EditButton {...buttonProps}>
      <EditIcon {...svgProps} />
    </EditButton>
  );
};
