import React, { useEffect , useRef , useState } from 'react'
import Message from './message'
import Neutral from './neutral'
import OnlineGrid from './onlinegrid'
import SendIcon from '@mui/icons-material/Send';

function Chat({socket,username,room , messageList , setMessageList}) {
    const [message, setMessage] = useState("")
    const [file, setFile] = useState()
    const [onlineList, setOnlineList] = useState([])
    const bottomRef = useRef()

    function selectFile(e){
        setMessage(e.target.files[0].name)
        setFile(e.target.files[0]) 
    }

    useEffect(() => {
      bottomRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messageList])
    

    useEffect(() => {
        socket.on("recieve-message",(data)=>{
            setMessageList((list)=>[...list,data])
        })

        socket.on("someone-joined",(username,time)=>{
            setMessageList((list)=>[...list,{username:username,time:time,join:true}])
            setOnlineList((prev) => [...prev,username])
            socket.emit("i-am-online",username)
        })

        socket.on("someone-left",(username,time)=>{
            setMessageList((list)=>[...list,{username:username,time:time,join:false}])
            setOnlineList((prev) => prev.filter((each)=>each!=username))
        })

        socket.on("online-member-update",(onlinelist)=>{
            onlinelist.forEach(element => {
                if(onlinelist.room = room){
                    setOnlineList(element.members)
                }
            });
        })

        return () => {
        socket.off("recieve-message");
        socket.off("someone-joined");
        socket.off("someone-left");
        socket.off("online-member-update");
        }
    },[socket])
    
    // function playNotif(){
    //     let audio = new Audio("notif.mp3")
    //     audio.play()
    // }

    async function sendMessage(e) {
        if(file){
            var time = new Date()
            const messageData = {
                author: username,
                room: room,
                type: "file",
                body: file,
                mimetype: file.type,
                fileName: file.name,
                time: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }
            await socket.emit("new-message", messageData)

            function getBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                  console.log("this is bas64 result ",reader.result);
                  return(reader.result)
                };
                reader.onerror = function (error) {
                  console.log('Error: ', error);
                };
            }

            setMessageList((list)=>[...list,messageData])
            setMessage("")
            setFile("")
        }

        else if(message){
            var time = new Date()
            const messageData = {
                room: room,
                author: username,
                message: message,
                type:"message",
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
        <div className='container-master-master'>
            <div className='container-master'>
                <div className='container' >
                    {[messageList.map((each)=>{
                        if(each.type == "message" || each.type == "file")
                            return(<Message data={each} left = {each.author == username} />)
                        else return(<Neutral data={each}/>)
                    })]}
                    <div
                    // this is dummy div
                        style={{ 
                            float:"left", 
                            clear: "both" 
                            }} 
                        ref = {bottomRef}
                    >
                    </div>
                </div>
                <div className="send-container">
                    <div className='file-input-master'>
                        {/* <span className='file-upload-span'> */}
                            {/* Upload */}
                            <input 
                                className='file-input'
                                accept="image/*"
                                type = "file" 
                                onChange={(e)=>{selectFile(e)}} 
                            />
                        {/* </span> */}
                    </div>
                    
                    <input
                        type="text" 
                        name="message" 
                        className='message-inputbox'
                        onChange={(e) => { 
                            setMessage(e.target.value)
                            }}
                        value = {message}
                        placeholder="Type something..."
                        onKeyDown={(e)=>{keypress(e)}}
                    />
                    {/* <button className='btn' onClick={sendMessage} >&#9658;</button> */}
                    <SendIcon onClick={sendMessage} className='send-button'/>
                </div>
            </div>
            <OnlineGrid List = {onlineList}/>
        </div>
        
    )
}

export default Chat