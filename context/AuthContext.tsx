// src/context/AuthContext.tsx
import { getUser } from "@/services/user.service";
import { User } from "@/types";
import { deleteToken } from "@/utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  userToken: string | null;
  user: {
    id: string;
    email: string;
    name: string;
    profileImage: string;
    aboutMe: string;
  } | null;
  setUserToken: (token: string | null) => void;
  setUser: (user: User) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  user: null,
  setUserToken: () => {},
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setUser(null);
          return;
        }

        const userData = await getUser();
        setUser(userData);
        setUserToken(token);
      } catch (e) {
        // If token is invalid/expired, clear it and reset auth state
        const errorMessage = e instanceof Error ? e.message : String(e);
        if (
          errorMessage.includes("Unauthorized") ||
          errorMessage.includes("401")
        ) {
          await deleteToken();
          setUserToken(null);
          setUser(null);
        } else {
          console.error("Error loading token", e);
        }
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (userToken) {
      const getUserData = async () => {
        try {
          const userData = await getUser();
          setUser(userData);
        } catch (e) {
          // If token becomes invalid, clear it and reset auth state
          const errorMessage = e instanceof Error ? e.message : String(e);
          if (
            errorMessage.includes("Unauthorized") ||
            errorMessage.includes("401")
          ) {
            await deleteToken();
            setUserToken(null);
            setUser(null);
          }
        }
      };
      getUserData();
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{ userToken, setUserToken, setUser, loading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
