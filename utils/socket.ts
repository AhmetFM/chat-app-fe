import { io, Socket } from "socket.io-client";
import { getApiUrl } from "./api-config";

// Get the API URL and convert http:// to ws:// for socket connection
const getSocketUrl = (): string => {
  const apiUrl = getApiUrl();
  // Socket.io works with http/https URLs, it will handle the protocol conversion
  return apiUrl;
};

export const socket: Socket = io(getSocketUrl(), {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
