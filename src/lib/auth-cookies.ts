import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

export const setAuthCookies = (
  accessToken: string,
  refreshToken: string,
  user?: any,
  rememberMe: boolean = false
) => {
  const options: Cookies.CookieAttributes = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  if (rememberMe) {
    options.expires = 7; // 7 days
  }

  Cookies.set(ACCESS_TOKEN_KEY, accessToken, options);
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, options);
  
  if (user) {
    Cookies.set(USER_KEY, JSON.stringify(user), options);
  }
};

export const getAuthCookies = () => {
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
  const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
  
  let user = null;
  const userStr = Cookies.get(USER_KEY);
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch {
      // ignore
    }
  }

  return { accessToken, refreshToken, user };
};

export const clearAuthCookies = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  Cookies.remove(USER_KEY);
};
