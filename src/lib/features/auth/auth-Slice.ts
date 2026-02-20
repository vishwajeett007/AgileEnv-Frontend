import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  rememberMe?: boolean;
  tokenExpiry?: number | null;
  isAuthenticated: boolean;
}

const loadFromStorage = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      rememberMe: false,
      tokenExpiry: null,
      isAuthenticated: false,
    };
  }

  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const user = localStorage.getItem("user");
  const rememberMe = localStorage.getItem("remember_me") === "true";
  const tokenExpiry = localStorage.getItem("token_expiry");
  const sessionExpiry = localStorage.getItem("session_expiry");

  const now = Date.now();

  if (!rememberMe && sessionExpiry) {
    const expiry = parseInt(sessionExpiry, 10);
    if (now > expiry) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      localStorage.removeItem("remember_me");
      localStorage.removeItem("token_expiry");
      localStorage.removeItem("session_expiry");
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        rememberMe: false,
        tokenExpiry: null,
        isAuthenticated: false,
      };
    }
  }

  return {
    user: user ? JSON.parse(user) : null,
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    rememberMe,
    tokenExpiry: tokenExpiry ? parseInt(tokenExpiry, 10) : null,
    isAuthenticated: !!accessToken,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadFromStorage(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: any;
        accessToken: string;
        refreshToken: string;
        rememberMe?: boolean;
      }>,
    ) => {
      const {
        user,
        accessToken,
        refreshToken,
        rememberMe = false,
      } = action.payload;
      state.user = user || null;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.rememberMe = rememberMe;
      state.isAuthenticated = true;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("remember_me", rememberMe.toString());
      localStorage.setItem(
        "token_expiry",
        (Date.now() + 60 * 60 * 1000).toString(),
      );

      if (!rememberMe) {
        const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("session_expiry", sessionExpiry.toString());
      } else {
        localStorage.removeItem("session_expiry");
      }
    },

    updateTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      const tokenExpiry = Date.now() + 60 * 60 * 1000;
      state.tokenExpiry = tokenExpiry;

      localStorage.setItem("access_token", action.payload.accessToken);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      localStorage.setItem("token_expiry", tokenExpiry.toString());

      const rememberMe = localStorage.getItem("remember_me") === "true";
      if (!rememberMe) {
        const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("session_expiry", sessionExpiry.toString());
      } else {
        localStorage.removeItem("session_expiry");
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.rememberMe = false;
      state.tokenExpiry = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("otpAllowed");
      localStorage.removeItem("otpAllowedForget");
      localStorage.removeItem("token_expiry");
      localStorage.removeItem("session_expiry");
    },
  },
});

export const { setCredentials, updateTokens, logout } = authSlice.actions;
export default authSlice.reducer;
