import { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "@/services/authService";
import { tokenManager } from "@/utils/tokenManager";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Restore session on initial application load
  const initSession = useCallback(async () => {
    if (!tokenManager.hasToken()) {
      setUser(null);
      setReady(true);
      return;
    }
    try {
      const restored = await authService.restoreSession();
      setUser(restored);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    initSession();

    // Listen to unauthorized event from apiClient
    const handleUnauthorized = () => {
      setUser(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [initSession]);

  const login = async (credentials) => {
    setAuthLoading(true);
    try {
      const loggedUser = await authService.login(credentials);
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (userData) => {
    setAuthLoading(true);
    try {
      const signedUser = await authService.signup(userData);
      setUser(signedUser);
      return signedUser;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    const refreshed = await authService.restoreSession();
    setUser(refreshed);
    return refreshed;
  };

  const value = {
    user,
    ready,
    authLoading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
