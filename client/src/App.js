import { useEffect, useState } from 'react'
import './App.css'
import './navbar.css'
import io from 'socket.io-client';
import Chat from './chat';
import Join from './join';
import Navbar from './navbar';
import Videoroom from './videoroom';

// const socket = io.connect("localhost:3001/");
const socket = io.connect("wss://historical-orchid-hardware.glitch.me/");

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [videoRoom,setVideoRoom] = useState(false)
  const [me, setMe] = useState("")


  function joinroom() {
    if (username && room && !showChat) {
      socket.emit("join-room", room ,username)
      setShowChat(true)
    }
  }

  useEffect(() => {
    socket.on("me", (id) => {
      console.log("me id is ",id)
			setMe(id)
		})
  
    return () => {
      socket.off("me")
    }
  }, [])
  

  return (
    <div className="App">
      <Navbar setVideoRoom = {setVideoRoom}/>
      {videoRoom?
        <Videoroom socket = {socket} me = {me} />
        : !showChat ?
            <>
              <p className='Heading'>Live Anonymous Room</p>
              <Join setUsername = {setUsername} setRoom = {setRoom} joinroom = {joinroom} socket={socket}/>
            </>
          :
          <>
            <p className='Heading'>Room Id : {room}</p>
            <Chat socket={socket} username={username} room={room} />
          </>
      }
        
    </div>
  )
}

export default App
