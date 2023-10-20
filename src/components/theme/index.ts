 interface ThemeTokens {
  grey: IColorToken;
  primary: IColorToken;
  secondary: IColorToken;
}

interface IColorToken {
  [keys: string]: string;
}

type ThemeShades =
  | keyof ThemeTokens['primary']
  | keyof ThemeTokens['secondary']
  | keyof ThemeTokens['grey'];

export const tokensDark: ThemeTokens = {
  grey: {
    0: '#ffffff',
    10: '#f6f6f6',
    50: '#f0f0f0',
    100: '#e0e0e0',
    200: '#c2c2c2',
    300: '#a3a3a3',
    400: '#858585',
    500: '#666666',
    600: '#525252',
    700: '#3d3d3d',
    800: '#292929',
    900: '#141414',
    1000: '#000000',
  },

  primary: {
    100: '#fdeceb',
    200: '#f9b2af',
    300: '#f58b86',
    400: '#f2655e',
    500: '#ef3e36',
    600: '#bf322b',
    700: '#8f2520',
    800: '#601916',
    900: '#300c0b',
  },

  secondary: {
    100: '#e7ecee',
    200: '#cfdadd',
    300: '#b8c7cc',
    400: '#a0b5bb',
    500: '#88a2aa',
    600: '#6d8288',
    700: '#526166',
    800: '#364144',
    900: '#1b2022',
  },
};

function reverseTokens(tokensDark: ThemeTokens) {
  const reversedTokens: { [key: string]: any } = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys: ThemeShades[] = Object.keys(val) as ThemeShades[];
    const values: any[] = Object.values(val);
    const length = keys.length;
    const reversedObj: IColorToken = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}

export const tokensLight: { [key: string]: any } = reverseTokens(tokensDark);

export const themeSettings = (mode: string) => {
  return {
    mode: mode,
    ...(mode === 'dark'
      ? {
          // palette values for dark mode
          primary: {
            ...tokensDark.primary,
            main: tokensDark.primary[500],
            light: tokensDark.primary[200],
          },
          secondary: {
            ...tokensDark.secondary,
            main: tokensDark.secondary[500],
            light: tokensDark.secondary[200],
          },
          neutral: {
            ...tokensDark.grey,
            main: tokensDark.grey[300],
            light: tokensDark.grey[500],
            text: tokensDark.grey[200],
          },
          background: {
            default: tokensDark.grey[700],
            alt: tokensDark.grey[600],
          },
        }
      : {
          // palette values for light mode
          primary: {
            ...tokensLight.primary,
            main: tokensLight.primary[500],
            light: tokensLight.primary[900],
          },
          secondary: {
            ...tokensLight.secondary,
            main: tokensLight.secondary[500],
            light: tokensLight.secondary[900],
          },
          neutral: {
            ...tokensLight.grey,
            main: tokensLight.grey[300],
            light: tokensLight.grey[500],
            text: tokensLight.grey[200],
          },
          background: {
            default: tokensLight.grey[700],
            alt: tokensLight.grey[600],
          },
        }),
  };
};
