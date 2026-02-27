import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  rememberMe: boolean;
  tokenExpiry: number | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  rememberMe: false,
  tokenExpiry: null,
  isAuthenticated: false,
};

const ONE_HOUR = 60 * 60 * 1000;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth: (state, action: PayloadAction<AuthState>) => {
      return action.payload;
    },

    setCredentials: (
      state,
      action: PayloadAction<{
        user: any;
        accessToken: string;
        refreshToken: string;
        rememberMe?: boolean;
      }>
    ) => {
      const { user, accessToken, refreshToken, rememberMe = false } =
        action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.rememberMe = rememberMe;
      state.tokenExpiry = Date.now() + ONE_HOUR;
      state.isAuthenticated = true;
    },

    updateTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiry = Date.now() + ONE_HOUR;
    },

    logout: () => {
      return initialState;
    },
  },
});

export const { setCredentials, updateTokens, logout, hydrateAuth } =
  authSlice.actions;

export default authSlice.reducer;