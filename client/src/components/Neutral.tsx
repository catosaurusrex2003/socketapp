import React from 'react'
import { generalMessageType } from '../types/message.type'

interface nerutralPropsType {
  data:generalMessageType
}

const Neutral = ({data}:nerutralPropsType) :JSX.Element => {
  if(data.join){
    return (
      <div className='mr-auto ml-auto max-w-lg text-center px-4 py-2 flex rounded-2xl bg-stone-200 mt-5 items-center '>
        <p className=' font-bold text-base break-all'>{data.username} Joined the room</p>
        <p className='  text-gray-600 ml-2'>8:30pm</p>
      </div>
    )
  }
  else{
    return (
      <div className='mr-auto ml-auto max-w-lg text-center px-4 py-2 flex rounded-2xl bg-stone-200 mt-5 items-center'>
        <p className=' font-bold text-base break-all'>{data.username} Left the room</p>
        <p className='  text-gray-600 ml-2'>8:30pm</p>
      </div>
    )
  }
  
}

export default Neutral