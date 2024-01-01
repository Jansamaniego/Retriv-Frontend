export const accessTokenCookieOptions: {
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'none';
} = {
  maxAge:
    Number(process.env.REACT_APP_JWT_ACCESS_EXPIRATION_MINUTES) * 60 * 1000,
  httpOnly: false,
  sameSite: 'lax',
};

export const refreshTokenCookieOptions: {
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'none';
} = {
  maxAge:
    Number(process.env.REACT_APP_JWT_REFRESH_EXPIRATION_DAYS) *
    24 *
    60 *
    60 *
    1000,
  httpOnly: false,
  sameSite: 'lax',
};
