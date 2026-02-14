import { useEffect, useMemo, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import {
  loginApi,
  registerApi,
  refreshApi,
  logoutApi,
  meApi,
  fetchWithAuth,
} from "../pages/Auth/authApi";

const ACCESS_TOKEN_KEY = "accessToken"; // only if "remember me" enabled

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Helpers
  // -----------------------------
  const saveAccessToken = useCallback((token, remember = false) => {
    setAccessToken(token);
    if (remember) localStorage.setItem(ACCESS_TOKEN_KEY, token);
    else localStorage.removeItem(ACCESS_TOKEN_KEY);
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }, []);

  // -----------------------------
  // Register (JWT)
  // -----------------------------
  const register = useCallback(async (name, email, password, remember = false) => {
    const data = await registerApi({ name, email, password });
    // data: { success, accessToken, user }
    saveAccessToken(data.accessToken, remember);
    setUser(data.user);
    return data;
  }, [saveAccessToken]);

  // -----------------------------
  // Login (JWT)
  // -----------------------------
  const login = useCallback(async (email, password, remember = false) => {
    const data = await loginApi({ email, password });
    saveAccessToken(data.accessToken, remember);
    setUser(data.user);
    return data;
  }, [saveAccessToken]);

  // -----------------------------
  // Logout (JWT)
  // -----------------------------
  const logout = useCallback(async () => {
    try {
      await logoutApi(); // clears refresh cookie server-side
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  // -----------------------------
  // Load user on app start
  // Strategy:
  // 1) if localStorage accessToken exists, try /me
  // 2) else try /refresh (cookie based)
  // -----------------------------
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      setLoading(true);
      try {
        const saved = localStorage.getItem(ACCESS_TOKEN_KEY);

        // 1) try saved access token
        if (saved) {
          try {
            const me = await meApi(saved);
            if (!mounted) return;
            setUser(me);
            setAccessToken(saved);
            setLoading(false);
            return;
          } catch {
            // saved token invalid/expired -> fall through to refresh
            localStorage.removeItem(ACCESS_TOKEN_KEY);
          }
        }

        // 2) try refresh cookie
        const refreshed = await refreshApi(); // { accessToken }
        if (!mounted) return;

        setAccessToken(refreshed.accessToken);

        // fetch user info
        const me = await meApi(refreshed.accessToken);
        if (!mounted) return;

        setUser(me);
      } catch {
        // not logged in
        if (!mounted) return;
        clearAuth();
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [clearAuth]);

  // -----------------------------
  // Google login / Reset password placeholders
  // Backend endpoints না থাকলে এগুলো disable রাখুন
  // -----------------------------
  const googleLogin = async () => {
    throw new Error("Google login is not enabled yet (backend OAuth endpoint required)");
  };

  const resetPassword = async () => {
    throw new Error("Reset password is not enabled yet (backend endpoint required)");
  };

  // -----------------------------
  // Professional: fetchWithAuth wrapper
  // 401 -> refresh -> retry
  // -----------------------------
  const authedFetch = useCallback(
    async (url, options = {}) => {
      if (!accessToken) throw new Error("Not authenticated");

      return fetchWithAuth(url, {
        ...options,
        accessToken,
        onNewAccessToken: (newToken) => setAccessToken(newToken),
      });
    },
    [accessToken]
  );

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      accessToken,

      // actions
      register,
      login,
      logout,

      // optional
      googleLogin,
      resetPassword,

      // helpers
      setAuth: ({ user, accessToken }, remember = false) => {
        setUser(user);
        saveAccessToken(accessToken, remember);
      },
      clearAuth,

      // for protected API calls
      authedFetch,
    }),
    [user, loading, accessToken, register, login, logout, saveAccessToken, clearAuth, authedFetch]
  );

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
