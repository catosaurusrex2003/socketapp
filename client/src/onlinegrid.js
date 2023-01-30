import React from 'react'

function EachBlock({username}){
    return(
        <div className="eachblock" >
            <span class="dot"></span>
            <p>{username}</p>
        </div>    
    )
}

function Emptylist(){
    return(
        <div className='empty-list'>
            <p className='empty-p'>No one is online :(</p>
        </div>
    )
}

function OnlineGrid({List}) {
  return (
    <div className='online-master'>
        <div className='online-header'>
            <p>Online</p>
        </div>
        <div className='online-list'>
            {/* <Emptylist/> */}
            {List.length?List.map((each)=><EachBlock username={each}/>):<Emptylist/>}
            {/* <EachBlock username={"Mohammed"}/> */}
        </div>

    </div>
  )
}



export default OnlineGrid