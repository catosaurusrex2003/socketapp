import React, { useEffect } from 'react'
import "./join.css"

function Join({ setUsername, setRoom, joinroom ,socket }) {

    function keypress(e){
        e.code =="Enter" && joinroom()
    }
    useEffect(() => {
        socket.on("online-member-update",(onlinelist)=>{
            console.log(onlinelist)
        })
    
      return () => {
        socket.off("online-member-update")
      }
    }, [])
    

    return (
        <div className="login-box">
            <h2>Enter Room</h2>
            <form>
                <div className="user-box">
                    <input 
                        type="text" 
                        name=""
                        placeholder='e.g: Mohammed'
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        onKeyDown={(e)=>{keypress(e)}}
                    />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input 
                        type="text" 
                        name=""
                        placeholder='e.g: 1'
                        onChange={(e) => {
                            setRoom(e.target.value)
                        }}
                        onKeyDown={(e)=>{keypress(e)}}
                    />
                    <label>Roomid</label>
                </div>
                <a href="#" onClick={joinroom}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Enter
                </a>
            </form>
        </div>
    )
}

export default Join