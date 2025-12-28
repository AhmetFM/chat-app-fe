import { socket } from "@/utils/socket";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";

type SocketContextType = {
  socket: typeof socket;
  connect: () => void;
  disconnect: () => void;
};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { userToken } = useContext(AuthContext);
  const connected = useRef(false);

  useEffect(() => {
    if (userToken && !connected.current) {
      socket.auth = { token: userToken };
      socket.connect();
      connected.current = true;
    }

    if (!userToken && connected.current) {
      socket.disconnect();
      connected.current = false;
    }
  }, [userToken]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connect: () => socket.connect(),
        disconnect: () => socket.disconnect(),
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used within SocketProvider");
  return ctx;
};
