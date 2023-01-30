import React from 'react'
import "./join.css"

function Join({ setUsername, setRoom, joinroom }) {

    function keypress(e){
        e.code =="Enter" && joinroom()
    }

    return (
        <div class="login-box">
            <h2>Enter Room</h2>
            <form>
                <div class="user-box">
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
                <div class="user-box">
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