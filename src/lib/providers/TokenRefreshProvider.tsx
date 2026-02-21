"use client";

import { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { updateTokens, logout } from "@/lib/features/auth/auth-Slice";
import { refreshAuthToken } from "@/features/auth/actions/auth";

const TOKEN_REFRESH_BUFFER = 2 * 60 * 1000; // 2 minutes
const ONE_DAY = 24 * 60 * 60 * 1000;

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { refreshToken, tokenExpiry, rememberMe, isAuthenticated } =
    useSelector((state: RootState) => state.auth);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.replace("/login");
  }, [dispatch, router]);

  const performTokenRefresh = useCallback(async () => {
    if (!refreshToken) {
      handleLogout();
      return;
    }

    try {
      const result = await refreshAuthToken(refreshToken);

      if (result.error || !result.accessToken || !result.refreshToken) {
        handleLogout();
        return;
      }

      dispatch(
        updateTokens({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        })
      );
    } catch (error) {
      console.error("Token refresh failed:", error);
      handleLogout();
    }
  }, [refreshToken, dispatch, handleLogout]);

  useEffect(() => {
    if (!isAuthenticated || !tokenExpiry) return;

    const now = Date.now();
    const refreshTime = tokenExpiry - TOKEN_REFRESH_BUFFER - now;

    if (refreshTime <= 0) {
      performTokenRefresh();
      return;
    }

    refreshTimeoutRef.current = setTimeout(() => {
      performTokenRefresh();
    }, refreshTime);

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [tokenExpiry, isAuthenticated, performTokenRefresh]);

  useEffect(() => {
    if (!isAuthenticated || rememberMe) return;

    const sessionExpiry = localStorage.getItem("session_expiry");

    if (!sessionExpiry) return;

    const expiry = parseInt(sessionExpiry, 10);
    const now = Date.now();

    if (now > expiry) {
      handleLogout();
      return;
    }

    const remaining = expiry - now;

    const timeout = setTimeout(() => {
      handleLogout();
    }, remaining);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, rememberMe, handleLogout]);


  useEffect(() => {
    if (!isAuthenticated) return;

    const handleFocus = () => {
      if (!tokenExpiry) return;

      const now = Date.now();

      if (now >= tokenExpiry - TOKEN_REFRESH_BUFFER) {
        performTokenRefresh();
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, [isAuthenticated, tokenExpiry, performTokenRefresh]);

  return <>{children}</>;
}