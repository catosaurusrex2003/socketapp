import  { useContext } from "react";
import ChatRoom from "./ChatRoom";
import JoinPage from "./Join";
import { Socket } from "socket.io-client";
import AllContext from "../context/allContext";

export interface ChatPageProps {
  socket: Socket;
  joinroom: () => void;
}

function ChatPage({ socket, joinroom }: ChatPageProps) {
  const {
    showChat,
  } = useContext(AllContext);

  return (
    <div>
      {showChat ? (
        <ChatRoom
          socket={socket}
        />
      ) : (
        <JoinPage
          socket={socket}
          joinroom={joinroom}
        />
      )}
    </div>
  );
}

export default ChatPage;
