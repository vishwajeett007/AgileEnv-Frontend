"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { updateTokens, logout } from "@/lib/features/auth/auth-Slice";
import { refreshAuthToken } from "@/features/auth/actions/auth";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useAuthFetch() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );

  const refreshPromiseRef = useRef<Promise<any> | null>(null);

  const authFetch = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      if (!accessToken) {
        dispatch(logout());
        router.replace("/login");
        throw new Error("Not authenticated");
      }

      const makeRequest = async (token: string) => {
        const isFormData = options.body instanceof FormData;

        return fetch(`${API_URL}${endpoint}`, {
          ...options,
          headers: {
            Authorization: `Bearer ${token}`,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...options.headers,
          },
        });
      };

      let response = await makeRequest(accessToken);

      // If unauthorized → try refresh once
      if (response.status === 401 && refreshToken) {
        try {
          if (!refreshPromiseRef.current) {
            refreshPromiseRef.current = refreshAuthToken(refreshToken);
          }

          const result = await refreshPromiseRef.current;
          refreshPromiseRef.current = null;

          if (
            result.error ||
            !result.accessToken ||
            !result.refreshToken
          ) {
            dispatch(logout());
            router.replace("/login");
            throw new Error("Session expired");
          }

          dispatch(
            updateTokens({
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
            })
          );

          // Retry original request
          response = await makeRequest(result.accessToken);
        } catch (error) {
          refreshPromiseRef.current = null;
          dispatch(logout());
          router.replace("/login");
          throw error;
        }
      }

      return response;
    },
    [accessToken, refreshToken, dispatch, router]
  );

  return authFetch;
}