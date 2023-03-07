import React from "react";
import ChatRoom from "./ChatRoom";
import JoinPage from "./Join";

function ChatPage({showChat,room,setRoom,username,setUsername,joinroom,socket,messageList,setMessageList,onlineList,setOnlineList,activeRooms,setActiveRooms}) {

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
