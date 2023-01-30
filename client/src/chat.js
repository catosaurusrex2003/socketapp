import React, { useEffect , useRef , useState } from 'react'
import Message from './message'
import Neutral from './neutral'

function Chat({socket,username,room}) {
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const [onlineList, setOnlineList] = useState([])
    const bottomRef = useRef()

    useEffect(() => {
      bottomRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messageList])
    
    

    useEffect(() => {
        console.log("useeffect running")

        socket.on("recieve-message",(data)=>{
            console.log("data")
            setMessageList((list)=>[...list,data])
        })

        socket.on("someone-joined",(username,time)=>{
            setMessageList((list)=>[...list,{username:username,time:time,join:true}])
            setOnlineList((prev) => [...prev,username])
            console.log("username joined ",{username:username,time:time})
        })

        socket.on("someone-left",(username,time)=>{
            setMessageList((list)=>[...list,{username:username,time:time,join:false}])
            setOnlineList((prev) => prev.filter((each)=>each!=username))
            console.log("username left ",{username:username,time:time})
        })

        return () => {
        socket.off("recieve-message").off();
        socket.off("someone-joined").off();
        socket.off("someone-left").off();
        }
    },[socket])
    

    async function sendMessage(e) {
        if(message){
            var time = new Date()
            const messageData = {
                room: room,
                author: username,
                message: message,
                type:"message",
                // time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
                time: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }
            await socket.emit("new-message", messageData)
            setMessageList((list)=>[...list,messageData])
            setMessage("")
        }
    }
    
    function keypress(e){
        e.code =="Enter" && sendMessage()
    }

    return (
        <div className='container-master'>
            <div className='container' >
                {/* <Neutral data={{message:"someone joined",time:"2:47pm"}}/> */}
                {[messageList.map((each)=>{
                    if(each.type == "message")
                        return(<Message data={each} left = {each.author == username} />)
                    else return(<Neutral data={each}/>)
                })]}
                <div
                    // this is a dummy div it has nothing in it
                    style={{ 
                        float:"left", 
                        clear: "both" 
                        }} 
                    ref = {bottomRef}
                >
                </div>
            </div>
            <div className="send-container">
                    <input 
                        type="text" 
                        name="message" 
                        className='message-inputbox'
                        onChange={(e) => { 
                            setMessage(e.target.value)
                            }}
                        value = {message}
                        onKeyDown={(e)=>{keypress(e)}}
                    />
                    <button className='btn' onClick={sendMessage} >&#9658;</button>
                </div>
        </div>
    )
}

export default Chat