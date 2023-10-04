import 'styled-components';
import theme from './components/theme';

type CustomTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme {
    neutral: IColorToken;
    primary: IColorToken;
    secondary: IColorToken;
    background: IColorToken;
  }
}

interface IColorToken {
  [keys: string]: string;
}
