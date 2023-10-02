import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  large?: boolean;
  superLarge?: boolean;
  children: React.ReactNode;
}

export const Button = styled.button<Props>`
  color: ${(props) => props.theme.primary.light};
  background: ${(props) =>
    props.secondary ? props.theme.secondary.main : props.theme.primary.main};
  font-weight: 500;
  ${(props) =>
    props.superLarge
      ? css`
          padding: 0.6em;
          font-size: 2rem;
        `
      : props.large
      ? css`
          padding: 0.5em;
          font-size: 2rem;
        `
      : css`
          padding: 0.4em;
          font-size: 1.6rem;
        `}
  box-shadow: none;
  border: none;
  border-radius: 0.5rem;
  width: ${(props) =>
    props.superLarge ? '26rem' : props.large ? '21rem' : '11rem'};
  display: inline-block;
  white-space: none;
  cursor: pointer;
  margin: 0.5rem 1rem;
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${(props) =>
      props.secondary ? props.theme.secondary.main : props.theme.primary[600]};
  }

  &:active {
    box-shadow: inset 0 20px 30px 0 rgba(0, 0, 0, 0.1);
    background: ${(props) =>
      props.secondary ? props.theme.secondary.main : props.theme.primary.main};
  }

  &:disabled {
    background: ${(props) => props.theme.neutral[100]};
    color: ${(props) => props.theme.primary[500]};
  }
`;
