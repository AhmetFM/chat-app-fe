import { AuthContext } from "@/context/AuthContext";
import {
  getToken,
  getUserData,
  refreshTokens,
  saveToken,
} from "@/utils/storage";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const { userToken, setUserToken } = useContext(AuthContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      const isValidToken = await getUserData(token!);

      if (!token || isValidToken.statusCode === 401) {
        setIsReady(true);
        return;
      }

      try {
        const newTokens = await refreshTokens(token!);

        setUserToken(newTokens.accessToken);
        await saveToken(newTokens.refreshToken);
      } catch (e) {
        console.log(e);
      } finally {
        setIsReady(true);
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  if (!userToken) {
    return <Redirect href={"/(auth)/welcome"} />;
  }

  return <Redirect href={"/(home)/chats"} />;
}
