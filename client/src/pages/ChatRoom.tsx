import React, { useState, useRef, useEffect, LegacyRef } from "react";
import ActiveModal from "../components/ActiveModal";
import Message from "../components/Message";

// @ts-ignore
import clipIcon from "../assets/paperclip.svg";
// @ts-ignore
import cameraIcon from "../assets/camera.svg";
// @ts-ignore
import smileyIcon from "../assets/smiley.svg";

import "../styles/ChatRoom.css";
import Neutral from "../components/Neutral";
import { Socket } from "socket.io-client";
import { ChatPageProps } from "./Chat";
import { generalMessageType } from "../types/message.type";

// interface Interface1 extends Pick<ChatPageProps, 'showChat' | 'room' | 'setRoom'> {}

interface ChatRoomProps
  extends Pick<
    ChatPageProps,
    | "socket"
    | "username"
    | "room"
    | "messageList"
    | "setMessageList"
    | "onlineList"
    | "setOnlineList"
  > {}

function ChatRoom({
  socket,
  username,
  room,
  messageList,
  setMessageList,
  onlineList,
  setOnlineList,
}: ChatRoomProps) {
  const [message, setMessage] = useState<string>("");
  const [inputPlaceholder , setInputPlaceholder] = useState<string>("Type something...")
  const [file, setFile] = useState<File | null>();
  const [typing, setTyping] = useState<boolean>(false);
  const [typingList, setTypingList] = useState<string[]>();

  const [timerId, setTimerId] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>();

  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("someone-joined", (username, time) => {
      setMessageList((list: generalMessageType[]): generalMessageType[] => [
        ...list,
        { username: username, time: time, join: true },
      ]);
      setOnlineList((prev: string[]): string[] => [...prev, username]);
      // no need
      // socket.emit("i-am-online", username);
    });

    socket.on("someone-left", (username, time) => {
      setMessageList((list: generalMessageType[]): generalMessageType[] => [
        ...list,
        { username: username, time: time, join: false },
      ]);
      setOnlineList((prev: string[]): string[] =>
        prev.filter((each) => each != username)
      );
    });

    socket.on(
      "online-member-update",
      (onlineMemberUpdate: { room: string; members: string[] }[]) => {
        onlineMemberUpdate.forEach((element) => {
          if ((element.room = room)) {
            setOnlineList(element.members);
          }
        });
      }
    );

    socket.on("typing-update", (data) => {
      setTypingList(data.filter((each:string) => 
      each !== username
    ))
    });

    return () => {
      socket.off("recieve-message");
      socket.off("someone-joined");
      socket.off("someone-left");
      socket.off("online-member-update");
      socket.off("typing-update");
    };
  }, [socket]);

  // function playNotif(){
  //     let audio = new Audio("notif.mp3")
  //     audio.play()
  // }

  function selectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files != null) {
      setFile(e.target.files[0]);
    }
  }

  const handlePaste = (event:React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = event.clipboardData // || window.clipboardData;
    const pastedData = clipboardData.items[0];
  
    if (pastedData.type.includes('image')) {
      const blob = pastedData.getAsFile();    
      if(blob){
        setFile(blob);
        setInputPlaceholder("Screenshot Pasted")
      }
    }
  };
  

  function typeingHandler() {
    setTyping(true);
    if (timerId) {
      clearTimeout(timerId);
      var timerTempId = setTimeout(() => {
        socket.emit("i-finished-typing", room, username);
        setTyping(false);
        setTimerId(null);
      }, 2000);
      setTimerId(timerTempId);
    } else {
      socket.emit("iam-typing", room, username);
      var timerTempId = setTimeout(() => {
        socket.emit("i-finished-typing", room, username);
        setTyping(false);
        setTimerId(null);
      }, 2000);
      setTimerId(timerTempId);
    }
  }

  async function sendMessage() {
    if (file) {
      var time = new Date();
      // console.log(file)
      const messageData = {
        author: username,
        room: room,
        type: "file",
        body: file,
        message:message,
        mimetype: file.type,
        size: file.size,
        fileName: file.name,
        time: time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      };
      await socket.emit("new-message", messageData);
      
      // @ts-ignore     YAHA PE KYU ERROR AARA HAI AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      setMessageList((list: generalMessageType[]): generalMessageType[] =>
        // @ts-ignore
        [...list, messageData]
      );
      setMessage("");
      setInputPlaceholder("Type something...")
      setFile(null);
    } 
    else if (message) {
      var time = new Date();
      const messageData = {
        room: room,
        author: username,
        message: message,
        type: "message",
        time: time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      };
      await socket.emit("new-message", messageData);
      setMessageList((list: generalMessageType[]): generalMessageType[] =>
        // @ts-ignore
        [...list, messageData]
      );
      setMessage("");
    }
  }

  function keypress(e: React.KeyboardEvent<HTMLInputElement>) {
    e.code == "Enter" && sendMessage();
  }

  return (
    <div className="flex flex-row justify-evenly ">
      <div className="h-[37em] w-[40em] bg-white rounded-3xl flex flex-col items-center relative ">
        {/* room id */}
        <p className="text-2xl font-semibold text-center py-3 pt-4  border-b-2 w-[90%] ">
          {room}
        </p>

        <div className="h-[36em] w-[40em] flex flex-col items-center overflow-y-scroll mb-2 border-b-[1px]">
          {/* all the messages */}
          {[
            messageList.map((each) => {
              if (each.type == "message" || each.type == "file")
                return <Message data={each} right={each.author == username} />;
              else return <Neutral data={each} />;
            }),
          ]}
          {/* to automatic scroll to end */}
          <div ref={bottomRef as LegacyRef<HTMLDivElement>}></div>
        </div>

        {/* the bottom bar */}
        <div className="bg-cyan-50 flex flex-col rounded-xl py-2 px-2  items-center mt-auto mb-4  bottom-8 ">
          

          {
            file?.type.split("/")[0] == "image"?
              <div className='flex flex-col px-4 w-full py-2 rounded-2xl  mr-5 border-b-[1px] mb-4 p-b-2 items-center '>
                <button className="bg-red-400 px-4 py-2 rounded-xl mb-2" onClick={()=>{setFile(null);setInputPlaceholder("Type something...")}} >Discard</button>
                <img src={URL.createObjectURL(file)} alt="" className='h-40'  />
                <p className='font-bold text-lg max-w-sm break-words text-right'></p>
              </div>
          
            :null
          }

          {
            file?
              file.type.split("/")[0] != "image"?
              <div className='flex flex-col px-4 w-full py-2 rounded-2xl  mr-5 border-b-[1px] mb-4 p-b-2 items-center '>
                <div className='flex flex-row items-center'>
                  <p className=' font-bold text-base'>{file.name}</p>
                  {/* <a className='' href={right ? `${URL.createObjectURL(data.body)}` : `${URL.createObjectURL(new Blob([data.body]))}`} download={data.fileName}><img className=" ml-3 h-10" src = {downloadIconBlack}  /></a> */}
                </div>
                <p className=' w-fit text-gray-600'>{Math.round(file.size / 1000)} kb</p>
              </div>
              :null
            :null
          }
          




          {typingList?.length ? (
            <div className="w-full border-b-[1px] mb-1 pb-1  ">
              <p className="mr-auto ml-4 text-sm text-gray-500 max-w-lg ">
                {typingList.map((each) => each)} is typing
              </p>
            </div>
          ) : null}

          <div className="flex">
            <label className="cursor-grab">
              <img className="h-8 mr-2" src={clipIcon} />
              <input
                className="hidden"
                type="file"
                onChange={(e) => {
                  selectFile(e);
                }}
              />
            </label>

            <input
              className="w-96 bg-cyan-50"
              name="message"
              onChange={(e) => {
                setMessage(e.target.value);
                typeingHandler();
              }}
              onPaste={handlePaste}
              value={message}
              placeholder={inputPlaceholder}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                keypress(e);
              }}
            />
            <img className="h-8 ml-2 mr-2 cursor-grab" src={smileyIcon} />
            <img className="h-8 ml-2 mr-2 cursor-grab" src={cameraIcon} />
          </div>
        </div>
      </div>

      {/* right side wala */}
      <div className="mt-14">
        <ActiveModal title={"Online People"} list={onlineList} />
      </div>
    </div>
  );
}

export default ChatRoom;
