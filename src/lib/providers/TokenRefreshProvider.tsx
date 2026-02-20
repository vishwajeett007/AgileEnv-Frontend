"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { updateTokens, logout } from "@/lib/features/auth/auth-Slice";
import { refreshAuthToken } from "@/features/auth/actions/auth";

const TOKEN_REFRESH_BUFFER = 2 * 60 * 1000; // 5 minutes
const SESSION_CHECK_INTERVAL = 60 * 1000; // 1 minute

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const sessionIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const { accessToken, refreshToken, tokenExpiry, rememberMe, isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push("/login");
    }, [dispatch, router]);

    const performTokenRefresh = useCallback(async () => {
        if (!refreshToken) {
            handleLogout();
            return;
        }
        try {
            const result = await refreshAuthToken(refreshToken);
            if (result.error) {
                console.error("Token refresh failed", result.error);
                handleLogout();
                return;
            }

            if (result.accessToken && result.refreshToken) {
                dispatch(updateTokens({
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                }));
            }
        } catch (error) {
            console.error("Error refreshing token", error);
            handleLogout();
        }
    }, [refreshToken, dispatch, handleLogout]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const checkSession = () => {
            if (rememberMe) return; // Don't check session expiry if Remember Me is enabled

            const sessionExpiry = localStorage.getItem("session_expiry");
            if (sessionExpiry) {
                const expiry = parseInt(sessionExpiry, 10);
                const now = Date.now();
                if (now > expiry) {
                    handleLogout();
                    return;
                }
            }
        }

        checkSession(); // Check session on every time when component mounts

        sessionIntervalRef.current = setInterval(checkSession, SESSION_CHECK_INTERVAL);

        return () => {
            if (sessionIntervalRef.current) {
                clearInterval(sessionIntervalRef.current);
            }
        };


    }, [rememberMe, handleLogout, isAuthenticated]);

    // Set up token refresh on focus
    useEffect(() => {
        if (!isAuthenticated) return;

        const handleFocus = () => {
            const now = Date.now();

            // Check session expiry first
            if (!rememberMe) {
                const sessionExpiry = localStorage.getItem("session_expiry");
                if (sessionExpiry && now > parseInt(sessionExpiry, 10)) {
                    handleLogout();
                    return;
                }
            }

            if (tokenExpiry && now >= tokenExpiry - TOKEN_REFRESH_BUFFER) {
                performTokenRefresh();
            }
        };

        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [isAuthenticated, tokenExpiry, rememberMe, performTokenRefresh, handleLogout]);

    return <>{children}</>;
}