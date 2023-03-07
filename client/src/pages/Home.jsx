import React, { useEffect } from "react";

function HomePage({socket,setActiveRooms}) {

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
    <div className="flex justify-center">
      <div className=" h-auto mx-5 flex flex-col text-center max-w-7xl ">
        <p className=" text-6xl mb-5  ">Welcome</p>
        <p className=" text-3xl my-8">
          This is a Completely Anonymous Chat app. No Data is saved. Everything is lost when u leave the room
        </p>
        <p className=" text-3xl my-8 ">
          U can join/create any Chatroom on the chat page. You can send any format of file in the chat
        </p>
        <p className=" text-3xl my-8 ">
          To create a private video call room u need to send your Id to the person who wants to call u. U can send it via the chat page.
        </p>
        <a className=" text-3xl my-8 text-blue-400 underline" href="https://github.com/catosaurusrex2003/socketapp">SOURCE CODE</a>
      </div>
    </div>
  );
}

export default HomePage;
