import { toast } from "sonner";

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;

export function saveAuthToStorage({
  user,
  accessToken,
  refreshToken,
  rememberMe,
}: {
  user: any;
  accessToken: string;
  refreshToken: string;
  rememberMe: boolean;
}) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem("remember_me", rememberMe.toString());
  localStorage.setItem("token_expiry", (Date.now() + ONE_HOUR).toString());

  if (!rememberMe) {
    localStorage.setItem(
      "session_expiry",
      (Date.now() + ONE_DAY).toString()
    );
  }
}

export function loadAuthFromStorage() {
  try {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const rememberMe = localStorage.getItem("remember_me");
    const tokenExpiry = localStorage.getItem("token_expiry");
    const sessionExpiry = localStorage.getItem("session_expiry");

    if (!user || !accessToken || !refreshToken) {
      return null;
    }

    const now = Date.now();
    const expiry = tokenExpiry ? parseInt(tokenExpiry, 10) : 0;

    // Check if session has expired (for non-rememberMe users)
    if (rememberMe === "false" && sessionExpiry) {
      const sessionExp = parseInt(sessionExpiry, 10);
      if (now > sessionExp) {
        clearAuthStorage();
        return null;
      }
    }

    return {
      user: JSON.parse(user),
      accessToken,
      refreshToken,
      rememberMe: rememberMe === "true",
      tokenExpiry: expiry,
      isAuthenticated: true,
    };
  } catch (error) {
    console.error("Failed to load auth from storage:", error);
    clearAuthStorage();
    return null;
  }
}

export function clearAuthStorage() {
  if(typeof window === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("remember_me");
  localStorage.removeItem("token_expiry");
  localStorage.removeItem("session_expiry");
}