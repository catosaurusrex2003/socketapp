import React, { useEffect , useState } from 'react'
import ActiveRooms from './activerooms'
import "./join.css"

function Join({ setUsername, setRoom, joinroom ,socket }) {

    const [activeRooms, setActiveRooms] = useState([])

    function keypress(e){
        e.code =="Enter" && joinroom()
    }
    useEffect(() => {
        socket.on("rooms-update",(onlinelist)=>{
            console.log(onlinelist)
            // var array = 
            setActiveRooms(onlinelist.map(each=>{
                // console.log(each)
                return(each.room)
            }))
        })

      return () => {
        socket.off("rooms-update")
      }
    }, [])
    

    return (
        <div className='join-master'>
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
            <div className='active-rooms-master-master'>
                <ActiveRooms List = {activeRooms}/>
            </div>
        </div>
        
    )
}

export default Join