import React from 'react'

function Message({data,left}) {
  // console.log(data,left)
  return (
    <div className={`message ${left?"message-right":"message-left"}  `}>
      <div className='message-author'>{data.author}</div>
      <div className='message-text'>{data.message}</div>
      <div className='message-timestamp'>{data.time}</div>
    </div>
  )
}

export default Message