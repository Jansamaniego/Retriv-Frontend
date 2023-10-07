import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../../../redux/features/themeSlice';
import { RootState } from 'src/redux/store';

interface IToggleContainerProps {
  mode: string;
}

const ToggleContainer = styled.div<IToggleContainerProps>`
  position: relative;
  display: block;
  width: 6.4rem;
  height: 3.2rem;
  border-radius: 3.2rem;
  background-color: ${(props) => props.theme.neutral.main};
  box-shadow: inset 0 0.2rem 1rem rgba(0, 0, 0, 01),
    inset 0 0.2rem 0.2rem rgba(0, 0, 0, 01),
    inset 0 -0.1rem 0.1rem rgba(0, 0, 0, 01);
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: ${(props) => (props.mode === 'dark' ? '3.2rem' : 0)};
    width: 3.2rem;
    height: 3.2rem;
    background: linear-gradient(
      to bottom,
      ${(props) => props.theme.neutral[700]},
      ${(props) => props.theme.neutral[600]}
    );
    border-radius: 3.2rem;
    transform: scale(0.9);
    box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.5),
      inset 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1),
      inset 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
  }
`;

const ThemeToggleButton = () => {
  const theme = useSelector((state: RootState) => state.themeState.theme);

  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return <ToggleContainer mode={theme} onClick={toggleTheme} />;
};

export default ThemeToggleButton;
