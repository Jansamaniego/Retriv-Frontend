import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  to?: string;
  isActive?: boolean;
}

export const StyledLink = styled(Link)<Props>`
  font-size: 1.6rem;
  padding: 0.4rem 0.8rem;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  color: ${(props) => props.theme.neutral[800]};

  &:hover {
    color: ${(props) => props.theme.neutral.light};
  }

  &:active {
    color: ${(props) => props.theme.neutral.main};
  }
`;
