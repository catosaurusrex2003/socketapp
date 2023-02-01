import React from 'react'

function EachBlock({roomId}){
    return(
        <div className="eachblock" >
            <span class="dot"></span>
            <p>{roomId}</p>
        </div>    
    )
}

function Emptylist(){
    return(
        <div className='empty-list'>
            <p className='empty-p'>No rooms is online. Join a room to create one :(</p>
        </div>
    )
}

function ActiveRooms({List}) {
    console.log("active rooms is ",List)
  return (
    <div className='active-rooms-master'>
        <div className='active-rooms-header'>
            <p>Active Rooms</p>
        </div>
        <div className='active-rooms-list'>
            {/* <Emptylist/> */}
            {List.length?List.map((each)=><EachBlock roomId={each}/>):<Emptylist/>}
            {/* <EachBlock username={"Mohammed"}/> */}
        </div>

    </div>
  )
}



export default ActiveRooms