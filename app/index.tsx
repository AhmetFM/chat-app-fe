import { Redirect } from "expo-router";

export default function Index() {
  /* const { userToken } = useContext(AuthContext);

  if (!userToken) {
    return <Redirect href={"/(auth)/welcome"} />;
  } */
  return <Redirect href={"/(home)/chats"} />;
}
