import React, { useEffect, useState } from "react";
import ActiveModal from "../components/ActiveModal";
import PurpleButton from "../components/PurpleButton";

function JoinPage({socket,setUsername,setRoom,joinroom,activeRooms,setActiveRooms}) {


  function keypress(e){
    e.code =="Enter" && joinroom()
  }

  useEffect(() => {
    socket.on("rooms-update",(onlinelist)=>{
        setActiveRooms(onlinelist.map(each=>{
            return(each.room)
        }))
    })

  return () => {
    socket.off("rooms-update")
  }
}, [])

  return (
    <div className=" flex flex-row justify-evenly items-center ">
      {/* left side div */}
      <div className=" h-96 w-[26em] bg-white flex flex-col items-center tracking-wide rounded-3xl justify-evenly">
        <p className="text-4xl font-black">Enter a Room</p>

        <div className="flex flex-col justify-between h-40 w-60 tracking-wider items-center">
          <p className="text-xl font-bold">Username</p>
          <input
            className=" min-w-full text-lg h-12 bg-yellow-50 rounded-lg p-1"
            placeholder="Your Name"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            onKeyDown={(e)=>{keypress(e)}}
          />
          <p className="text-xl font-bold">Room Name</p>
          <input
            className=" min-w-full text-lg h-12 bg-yellow-50 rounded-lg p-1"
            placeholder="Room Name"
            onChange={(e) => {
              setRoom(e.target.value)
            }}
            onKeyDown={(e)=>{keypress(e)}}
          />
        </div>

        <PurpleButton text={"Enter"} onClick={joinroom} />
      </div>

      {/* right side div */}
      <ActiveModal
        title={"Active Rooms"}
        list={activeRooms}
      />
    </div>
  );
}

export default JoinPage;
