import React from 'react'

function Neutral({data}) {
  if(data.join){
    return (
      <div className={`message message-neutral `}>
        <div className='message-text'>{data.username} joined the room at</div>
        <div className='message-timestamp'>  {data.time}</div>
      </div>
    )
  }
  else{
    return (
      <div className={`message message-neutral `}>
        <div className='message-text'>{data.username} left the room at</div>
        <div className='message-timestamp'>  {data.time}</div>
      </div>
    )
  }
  
}

export default Neutral