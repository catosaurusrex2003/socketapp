import React from 'react'

function Message({data,left}) {
  if (data.type == "file") {
      const base64String = btoa(String.fromCharCode(...new Uint8Array(data.body)));
      return (
        <div className={`message ${left?"message-right":"message-left"}  `}>
          <div className='message-author'>{data.author}</div>
          <img src={left?`${URL.createObjectURL(data.body)}`:`data:image/png;base64,${base64String}`} alt="" className='message-img' />
          <div className='message-timestamp'>{data.time}</div>
        </div>
      )
    // }
    
  }
  else if(data.type = "message")
    return (
      <div className={`message ${left?"message-right":"message-left"}  `}>
        <div className='message-author'>{data.author}</div>
        <div className='message-text'>{data.message}</div>
        <div className='message-timestamp'>{data.time}</div>
      </div>
    )

}

export default Message