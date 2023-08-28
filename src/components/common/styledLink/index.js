import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
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
