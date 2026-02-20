"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { updateTokens, logout } from "@/lib/features/auth/auth-Slice";
import { refreshAuthToken } from "@/features/auth/actions/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { string } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useAuthFetch() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { accessToken, refreshToken, tokenExpiry } = useSelector(
    (state: RootState) => state.auth,
  );

  const authFetch = useCallback(
    async (endpoints: string, options: RequestInit = {}) => {
      let currentAccessToken = accessToken;

      if (tokenExpiry && tokenExpiry < Date.now() - 2 * 60 * 1000) {
        if (!refreshToken) {
          dispatch(logout());
          router.push("/login");
          throw new Error("No refresh token found, please login again.");
        }

        const result = await refreshAuthToken(refreshToken);

        if (result.error) {
          dispatch(logout());
          router.push("/login");
          throw new Error("Token refresh failed");
        }

        if (result.accessToken && result.refreshToken) {
          dispatch(
            updateTokens({
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
            }),
          );
          currentAccessToken = result.accessToken;
        }
      }
      const isFormData = options.body instanceof FormData;

      const response = await fetch(`${API_URL}${endpoints}`, {
        ...options,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          Authorization: `Bearer ${currentAccessToken}`,
          ...options.headers,
        },
      });

      if (response.status === 401 && refreshToken) {
        const result = await refreshAuthToken(refreshToken);

        if (result.error) {
          dispatch(logout());
          router.push("/login");
          throw new Error("Session expired");
        }

        if (result.accessToken && result.refreshToken) {
          dispatch(
            updateTokens({
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
            }),
          );

          const isFormData = options.body instanceof FormData;

          const retryResponse = await fetch(`${API_URL}${endpoints}`, {
            ...options,
            headers: {
              Authorization: `Bearer ${result.accessToken}`,
              ...(isFormData ? {} : { "Content-Type": "application/json" }),
              ...options.headers,
            },
          });
          return retryResponse;
        }
      }
      return response;
    },
    [accessToken, refreshToken, tokenExpiry, dispatch, router],
  );

  return authFetch;
}
