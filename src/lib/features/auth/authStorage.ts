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

export function clearAuthStorage() {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("remember_me");
  localStorage.removeItem("token_expiry");
  localStorage.removeItem("session_expiry");
}