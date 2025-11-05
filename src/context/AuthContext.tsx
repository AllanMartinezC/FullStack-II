import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
interface AuthContextType {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("hh_user");
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (name: string) => {
    setUser(name);
    localStorage.setItem("hh_user", name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hh_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
