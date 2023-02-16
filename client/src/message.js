import React, { useState } from 'react'

function Message({ data, left }) {
  if (data.type == "file") {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(data.body)));
    // IMAGES 
    if (data.mimetype == "image/png" || data.mimetype == "image/jpeg") {
      console.log("png")
      return (
        <div className={`message ${left ? "message-right" : "message-left"}  `}>
          <div className='message-author'>{data.author}</div>
          <img src={left ? `${URL.createObjectURL(data.body)}` : `data:image/png;base64,${base64String}`} alt="" className='message-img' />
          <div className='message-timestamp'>{data.time}</div>
        </div>
      )
    }

    // CAN BE ANY FILE , PDF , ZIP , EXCEL , DOC , MP3 , MP4 , TABLEAU
    else {
      return (
        <div className={`message ${left ? "message-right" : "message-left"}  `}>
          <div className='message-author'>{data.author}</div>
          <a className='message-text download-link ' href={left ? `${URL.createObjectURL(data.body)}` : `${URL.createObjectURL(new Blob([data.body]))}`} download={data.fileName}>{data.fileName}</a>
          <div className='message-timestamp'>{data.time}</div>
        </div>
      )
    }




  }
  else if (data.type = "message")
    return (
      <div className={`message ${left ? "message-right" : "message-left"}  `}>
        <div className='message-author'>{data.author}</div>
        <div className='message-text'>{data.message}</div>
        <div className='message-timestamp'>{data.time}</div>
      </div>
    )

}

export default Message