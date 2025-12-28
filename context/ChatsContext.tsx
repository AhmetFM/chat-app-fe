import { Chat } from "@/types";
import React, { createContext, useContext, useState } from "react";

interface ChatContextType {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

export const ChatsContext = createContext<ChatContextType | null>(null);

export const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  return (
    <ChatsContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error("useChatsContext muse be used within ChatsProvider");
  }
  return context;
};
