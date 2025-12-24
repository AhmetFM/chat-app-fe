// src/context/AuthContext.tsx
import { getUser } from "@/services/user.service";
import { User } from "@/types";
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
  };
  setUserToken: (token: string | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  user: {
    id: "",
    email: "",
    name: "",
    profileImage: "",
    aboutMe: "",
  },
  setUserToken: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    name: "",
    profileImage: "",
    aboutMe: "",
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setUserToken(token);
          const user = await getUser();
          setUser(user);
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
    <AuthContext.Provider value={{ userToken, setUserToken, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
