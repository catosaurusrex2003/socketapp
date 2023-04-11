// REMOVE THIS AFTERWARDS
// @ts-nocheck

import React from 'react'

// @ts-ignore
import downloadIconWhite from "../assets/download.svg"
// @ts-ignore
import downloadIconBlack from "../assets/downloadblack.svg"
import { generalMessageType } from '../types/message.type';

interface messagePropsType {
  data:generalMessageType,
  right:boolean
}

const Message = ({data,right}:messagePropsType):JSX.Element => {

  console.log

  if (data.type == "file") {

    // console.log(data)
    const base64String = btoa(String.fromCharCode(...new Uint8Array(data.body)));

    // IMAGES 
    if (data.mimetype == "image/png" || data.mimetype == "image/jpeg") {
      // console.log("png")
      if(right){
        return (
          <div className='ml-auto px-4 py-2 rounded-2xl bg-violet-300 mr-5 mt-5'>
            <p className=' w-fit ml-auto  text-lg max-w-xs break-words text-right '>{data.author}</p>
            <img src={right ? `${URL.createObjectURL(data.body)}` : `data:image/png;base64,${base64String}`} alt="" className='h-40' />
            <p className='ml-auto font-bold text-lg max-w-sm break-words text-right'>{data.message}</p>
            <p className=' w-fit ml-auto text-sm text-gray-600'>{data.time}</p>
          </div>
        )
      }
      else{
        return(
          <div className='mr-auto px-4 py-2 rounded-2xl bg-green-200 ml-5 mt-5 '>
            <p className=' w-fit mr-auto  text-lg max-w-xs break-words text-left '>{data.author}</p>
            <img src={right ? `${URL.createObjectURL(data.body)}` : `data:image/png;base64,${base64String}`} alt="" className='h-40' />
            <p className='ml-auto font-bold text-lg max-w-sm break-words text-left'>{data.message}</p>
            <p className=' w-fit mr-auto text-sm text-gray-600'>{data.time}</p>
          </div>
        )
      }
      
    }

    // CAN BE ANY FILE , PDF , ZIP , EXCEL , DOC , MP3 , MP4 , TABLEAU
    else {
      if(right){
        return(
          <div className='ml-auto px-4 py-2 rounded-2xl bg-violet-300 mr-5 mt-5 '>
            <p className=' w-fit ml-auto  text-lg max-w-xs break-words text-right '>{data.author}</p>
            <div className='flex flex-row items-center'>
              <p className=' font-bold text-base'>{data.fileName}</p>
              <a className='' href={right ? `${URL.createObjectURL(data.body)}` : `${URL.createObjectURL(new Blob([data.body]))}`} download={data.fileName}><img className=" ml-3 h-10" src = {downloadIconBlack}  /></a>
            </div>
            <p className='ml-auto font-bold text-lg max-w-sm break-words text-right'>{data.message}</p>
            <div className='flex items-center'>
              <p className=' w-fit mr-auto text-gray-600'>{Math.round(data.size / 1000)} kb</p>
              <p className=' w-fit ml-auto text-sm text-gray-600'>{data.time}</p>
            </div>
          </div>
        )
      }
      else{
        return (
          <div className='mr-auto px-4 py-2 rounded-2xl bg-green-200 ml-5 mt-5 '>
            <p className=' w-fit mr-auto  text-lg max-w-xs break-words text-left '>{data.author}</p>
            <div className='flex flex-row items-center'>
              <p className=' font-bold text-base'>{data.fileName}</p>
              <a className='' href={right ? `${URL.createObjectURL(data.body)}` : `${URL.createObjectURL(new Blob([data.body]))}`} download={data.fileName}><img className=" ml-3 h-10" src = {downloadIconBlack}  /></a>
              {/* <img className="h-10" src = {downloadIconBlack}  /> */}
            </div>
            <p className='ml-auto font-bold text-lg max-w-sm break-words text-left'>{data.message}</p>
            <div className='flex  items-center'>
              <p className=' w-fit mr-auto text-gray-600'>{Math.round(data.size / 1000)} kb</p>
              <p className=' w-fit ml-auto text-sm text-gray-600'>{data.time}</p>
            </div>
          </div>
        )
      }
    }
  }
  else if (data.type = "message"){
    if(right){
      return (
        // right side wala hai ye
        <div className='ml-auto px-4 py-2 rounded-2xl bg-violet-300 mr-5 mt-2 mb-2'>
            <p className=' w-fit ml-auto  text-lg max-w-xs break-words text-right '>{data.author}</p>
            <p className='ml-auto font-bold text-lg max-w-sm break-words text-right'>{data.message}</p>
            <p className=' w-fit ml-auto text-sm text-gray-600'>{data.time}</p>
        </div>
      )
    }
    else{
      return(
        // left side wala hai ye
        <div className='mr-auto px-4 py-2 rounded-2xl bg-green-200 ml-5 mt-2 mb-2 '>
          <p className=' w-fit mr-auto  text-lg max-w-xs break-words text-left '>{data.author}</p>
          <p className=' mr-auto font-bold text-lg max-w-sm break-words text-left'>{data.message}</p>
          <p className=' w-fit mr-auto text-sm text-gray-600'>{data.time}</p>
        </div>
      )
    }
  }
  else{
    return <></>
  }
}

export default Message