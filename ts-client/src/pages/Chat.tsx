import React from "react";
import ChatRoom from "./ChatRoom";
import JoinPage from "./Join";
import { Socket } from "socket.io-client";
import { generalMessageType } from "../types/message.type";
import { onlinePeopleType } from "../types/onlinePeople.type";

export interface ChatPageProps {
  showChat: boolean,
  room: string,
  setRoom: React.Dispatch<React.SetStateAction<string>>,
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  joinroom :()=>void,
  socket:Socket,
  messageList:generalMessageType[],
  setMessageList:React.Dispatch<React.SetStateAction<generalMessageType[]>>,
  onlineList:string[],
  setOnlineList:React.Dispatch<React.SetStateAction<string[]>>,
  activeRooms:string[]| null,
  setActiveRooms:React.Dispatch<React.SetStateAction<string[] | null>>
}

function ChatPage({showChat,room,setRoom,username,setUsername,joinroom,socket,messageList,setMessageList,onlineList,setOnlineList,activeRooms,setActiveRooms}:ChatPageProps) {

  return (
    <div>
      {
        showChat?
        <ChatRoom socket={socket} username={username} room={room} messageList={messageList} setMessageList={setMessageList} onlineList={onlineList} setOnlineList={setOnlineList} />
        :
        <JoinPage socket={socket} setUsername={setUsername} setRoom={setRoom} joinroom={joinroom} activeRooms={activeRooms} setActiveRooms={setActiveRooms} />
      }
    </div>
  );
}

export default ChatPage;
