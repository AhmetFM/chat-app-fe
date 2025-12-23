// src/context/AuthContext.tsx
import { getUser } from "@/services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  userToken: string | null;
  userId: string | null;
  setUserToken: (token: string | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  userId: null,
  setUserToken: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setUserToken(token);
          const user = await getUser();
          setUserId(user.id);
        }
      } catch (e) {
        console.error("Error loading token", e);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, loading, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
