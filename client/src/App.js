import { useState } from 'react'
import './App.css'
// const socket = io("https://localhost:8000")
import io from 'socket.io-client';
import Chat from './chat';
import Join from './join';

const socket = io.connect("http://localhost:3001");

function App() {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false) //CHANGE THIS  



  function joinroom() {
    if (username && room && !showChat) {
      console.log("emitted ", username, room)
      socket.emit("join-room", room ,username)
      setShowChat(true)
    }
  }
  // var elem = document.getElementById('container');
  // elem.scrollTop = elem.scrollHeight;

  return (
    <div className="App">
      {!showChat ?<p className='Heading'>Live Anonymous Room</p>
      :<p className='Heading'>Room Id : {room}</p>}

      
      {!showChat ?
        <Join setUsername = {setUsername} setRoom = {setRoom} joinroom = {joinroom}/>
        :<Chat socket={socket} username={username} room={room} />}
    </div>
  )
}

export default App
