import { createContext, useContext, useState } from "react";

type ActiveChatContextType = {
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
};

export const ActiveChatContext = createContext<ActiveChatContextType>({
  activeChatId: null,
  setActiveChatId: () => {},
});

export const ActiveChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  return (
    <ActiveChatContext.Provider value={{ activeChatId, setActiveChatId }}>
      {children}
    </ActiveChatContext.Provider>
  );
};

export const useActiveChat = () => useContext(ActiveChatContext);
