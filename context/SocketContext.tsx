import { socket } from "@/utils/socket";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";

type SocketContextType = {
  socket: typeof socket;
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { userToken } = useContext(AuthContext);
  const connected = useRef(false);
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    // Set up socket event listeners
    const onConnect = () => {
      //console.log("Socket connected");
      setIsConnected(true);
      connected.current = true;
    };

    const onDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
      connected.current = false;
    };

    const onConnectError = (error: Error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
      connected.current = false;
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    // Handle authentication and connection
    if (userToken) {
      // Set auth token - format depends on your backend
      // Common formats: { token: userToken } or { token: `Bearer ${userToken}` }
      socket.auth = { token: userToken };

      // Only connect if not already connected
      if (!socket.connected && !connected.current) {
        console.log("Connecting socket with token...");
        socket.connect();
      }
    } else {
      // Disconnect if no token
      if (socket.connected || connected.current) {
        console.log("Disconnecting socket - no token");
        socket.disconnect();
        connected.current = false;
        setIsConnected(false);
      }
    }

    // Cleanup
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
    };
  }, [userToken]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connect: () => {
          if (userToken) {
            socket.auth = { token: userToken };
            socket.connect();
          }
        },
        disconnect: () => {
          socket.disconnect();
        },
        isConnected,
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
