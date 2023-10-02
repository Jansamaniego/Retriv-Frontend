import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  isActive: boolean;
}

export const StyledLink = styled(Link)<Props>`
  font-size: 1.6rem;
  padding: 0.4rem 0.8rem;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-weight: ${(props) => (props.isActive ? 700 : 300)};
  color: ${(props) => props.theme.neutral.text};

  &:hover {
    color: ${(props) => props.theme.neutral.light};
  }

  &:active {
    color: ${(props) => props.theme.neutral.main};
  }
`;
