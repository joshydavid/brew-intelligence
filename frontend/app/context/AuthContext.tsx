"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  authId: string;
  setAuthId: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authId, setAuthId] = useState<string>();
  return (
    <AuthContext.Provider value={{ authId, setAuthId }}>
      {children}
    </AuthContext.Provider>
  );
};
