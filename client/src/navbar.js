import React from 'react'

function Navbar({setVideoRoom}) {
    return (
        <nav class="navbar navbar-expand-lg bg-dark "  >
            <div class="container-fluid">
                <a class=" navbar-brand white-font cursor-change" 
                    onClick={()=>{setVideoRoom(false)}}
                >Chatrooms</a>
                <a class="white-font navbar-brand cursor-change"  
                    onClick={()=>{setVideoRoom(true)}}
                >Video Chat</a>
            </div>
        </nav>
    )
}

export default Navbar