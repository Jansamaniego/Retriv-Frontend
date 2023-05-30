import styled, { css } from 'styled-components';

export const Button = styled.button`
  color: white;
  background: ${(props) =>
    props.secondary ? props.theme.secondary : props.theme.primary};
  font-weight: bold;
  ${(props) =>
    props.large
      ? css`
          padding: 1rem;
          border-radius: 0.5rem;
          font-size: 2rem;
        `
      : css`
          padding: 0.8rem;
          border-radius: 0.4rem;
          font-size: 1.6rem;
        `}
  box-shadow: none;
  border: none;
  width: ${(p) => (p.menu ? '21rem' : '11rem')};
  display: inline-block;
  white-space: none;
  margin: 0.5rem 1rem;

  &:disabled {
    background: ${(props) => props.theme.offWhite};
    color: ${(props) => props.theme.offBlack};
  }
`;
