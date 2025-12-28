import { ActiveChatContext } from "@/context/ActiveChatContext";
import { useContext, useEffect } from "react";

const useConversationsSocket = () => {
  const { activeChatId } = useContext(ActiveChatContext);

  useEffect(() => {
    /* socket.on("message:new",({message,conversation}=> {
           
        })) */
  });
};

export default useConversationsSocket;
