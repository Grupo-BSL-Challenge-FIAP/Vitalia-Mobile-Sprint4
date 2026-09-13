import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { authService, MeResponse } from "../services/authService";
import { tokenStorage } from "../storage/tokenStorage";

interface AuthContextData {
  user: MeResponse | null;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
  restoreSession: () => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<MeResponse | null>(null);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [isLoadingSession, setIsLoadingSession] =
    useState(true);

  const restoreSession = async () => {
    try {
      setIsLoadingSession(true);

      const token = await tokenStorage.get();

      if (!token) {
        setUser(null);
        setIsAuthenticated(false);

        return;
      }

      const currentUser = await authService.me();

      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      await tokenStorage.remove();

      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const logout = async () => {
    await tokenStorage.remove();

    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingSession,
        restoreSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}