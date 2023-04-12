import "./App.css";
import { useContext, useEffect, useState } from "react";
import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/Chat";
import LogoutPage from "./pages/Logout";
import SettingsPage from "./pages/Settings";
import VideoPage from "./pages/Video";

// changed neeche ka connect slightly
import io, { connect } from "socket.io-client";
import { generalMessageType } from "./types/message.type";
import { onlinePeopleType } from "./types/onlinePeople.type";
import AllContext from "./context/allContext";

const socket = connect("localhost:3001/");
// const socket = io.connect("wss://historical-orchid-hardware.glitch.me/");

const App = (): JSX.Element => {
  // I WISH I USED REDUX
  const {username, showChat ,setShowChat , room ,setMe ,currentPage } = useContext(AllContext);
  


  function joinroom() {
    if (username && room && !showChat) {
      socket.emit("join-room", room, username);
      setShowChat(true);
    }
  }

  // console.log(onlineList)

  useEffect(() => {
    socket.on("me", (id) => {
      // console.log("me id is ",id)
      setMe(id);
    });

    return () => {
      socket.off("me");
    };
  }, []);

  return (
    <div className="App flex flex-col ">
      <Navbar  />
      <div className="mt-8">
        {currentPage == "home" ? (
          <HomePage socket={socket}/>
        ) : null}

        {currentPage == "chat" ? (
          <ChatPage socket={socket} joinroom={joinroom} />
        ) : null}

        {currentPage == "video" ? <VideoPage socket={socket} /> : null}

        {currentPage == "settings" ? (
          <SettingsPage/>
        ) : null}

        {currentPage == "logout" ? (
          <LogoutPage/>
        ) : null}
      </div>
    </div>
  );
};

export default App;
