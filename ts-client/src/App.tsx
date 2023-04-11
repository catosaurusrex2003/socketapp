import "./App.css";
import { useEffect, useState } from "react";
import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/Chat";
import LogoutPage from "./pages/Logout";
import SettingsPage from "./pages/Settings";
import VideoPage from "./pages/Video";

// changed neeche ka connect slightly
import io , {connect} from 'socket.io-client';
import { generalMessageType } from "./types/message.type";
import { onlinePeopleType } from "./types/onlinePeople.type";

const socket = connect("localhost:3001/");
// const socket = io.connect("wss://historical-orchid-hardware.glitch.me/");


const App = ():JSX.Element => {

  // I WISH I USED REDUX 
  // list of messages
  const [messageList, setMessageList] = useState<generalMessageType[]>([])
  // list of online people
  const [onlineList, setOnlineList] = useState<string[]>([])
  //  list of online rooms
  const [activeRooms, setActiveRooms] = useState<string[] | null>([])
  // username of the person who joined
  const [username, setUsername] = useState<string>("")
  // the room id of the socket connection
  const [room, setRoom] = useState<string>("")
  // a bool to know whether the user  has joined a room or not
  const [showChat, setShowChat] = useState<boolean>(false)
  // auto generated user id used to connect video via peerjs
  const [me, setMe] = useState<string>("")
  // defines the page which the user is currenlty on, can take values home , chat , video , notif , settings , logout
  const [currentPage, setCurrentPage] = useState<string>("home");
  // can take values light dark purple yellow green
  const [currentTheme, setCurrentTheme] = useState<string>("yellow");


  function joinroom() {
    if (username && room && !showChat) {
      socket.emit("join-room", room ,username)
      setShowChat(true)
    }
  }

  // console.log(onlineList)

  useEffect(() => {
    socket.on("me", (id) => {
      // console.log("me id is ",id)
			setMe(id)
		})
  
    return () => {
      socket.off("me")
    }
  }, [])


  

  return (
    <div className="App flex flex-col ">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="mt-8">

        {currentPage == "home" ? <HomePage socket={socket} setActiveRooms={setActiveRooms} /> : null}

        {currentPage == "chat" ? <ChatPage onlineList={onlineList} setOnlineList={setOnlineList}  showChat={showChat} room={room}  setRoom={setRoom} username={username} setUsername={setUsername} joinroom={joinroom}  socket={socket} messageList={messageList} setMessageList={setMessageList} activeRooms={activeRooms} setActiveRooms={setActiveRooms}  /> : null}

        {currentPage == "video" ? <VideoPage socket={socket} me={me} /> : null}

        {currentPage == "settings" ? (
          <SettingsPage
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
          />
        ) : null}

        {currentPage == "logout" ? (
          <LogoutPage setCurrentPage={setCurrentPage} />
        ) : null}

      </div>
    </div>
  );
}

export default App;
