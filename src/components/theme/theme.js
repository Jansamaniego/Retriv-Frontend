export const tokensDark = {
  grey: {
    0: '#ffffff',
    10: '#f6f6f6',
    50: 'f0f0f0',
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
    100: '#fcd8d7',
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

function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

export const themeSettings = (mode) => {
  return {
    mode: mode,
    ...(mode === 'dark'
      ? {
          // palette values for dark mode
          primary: {
            ...tokensDark.primary,
            main: tokensDark.primary[500],
            light: tokensDark.primary[500],
          },
          secondary: {
            ...tokensDark.secondary,
            main: tokensDark.secondary[500],
          },
          neutral: {
            ...tokensDark.grey,
            main: tokensDark.grey[500],
          },
          background: {
            default: tokensDark.primary[600],
            alt: tokensDark.primary[500],
          },
        }
      : {
          // palette values for light mode
          primary: {
            ...tokensLight.primary,
            main: tokensDark.grey[50],
            light: tokensDark.grey[100],
          },
          secondary: {
            ...tokensLight.secondary,
            main: tokensDark.secondary[600],
            light: tokensDark.secondary[700],
          },
          neutral: {
            ...tokensLight.grey,
            main: tokensDark.grey[500],
          },
          background: {
            default: tokensDark.grey[0],
            alt: tokensDark.grey[50],
          },
        }),
  };
};
