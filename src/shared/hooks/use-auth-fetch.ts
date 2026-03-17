"use client";

import { refreshAuthToken } from "@/features/auth/actions/auth";
import { getAuthCookies, setAuthCookies, clearAuthCookies } from "@/lib/auth-cookies";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useAuthFetch() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const refreshPromiseRef = useRef<Promise<any> | null>(null);

  const authFetch = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      const { accessToken, refreshToken, user } = getAuthCookies();

      if (!accessToken) {
        clearAuthCookies();
        queryClient.removeQueries({ queryKey: ['user'] });
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
            clearAuthCookies();
            queryClient.removeQueries({ queryKey: ['user'] });
            router.replace("/login");
            throw new Error("Session expired");
          }

          setAuthCookies(result.accessToken, result.refreshToken, user);

          // Retry original request
          response = await makeRequest(result.accessToken);
        } catch (error) {
          refreshPromiseRef.current = null;
          clearAuthCookies();
          queryClient.removeQueries({ queryKey: ['user'] });
          router.replace("/login");
          throw error;
        }
      }

      return response;
    },
    [router, queryClient]
  );

  return authFetch;
}