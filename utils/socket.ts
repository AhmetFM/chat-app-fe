import { io } from "socket.io-client";

export const socket = io("http://192.168.68.109:3000", {
  transports: ["websocket"],
  autoConnect: false,
});
