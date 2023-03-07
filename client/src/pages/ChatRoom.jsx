import React ,{useState,useRef,useEffect} from 'react'
import ActiveModal from '../components/ActiveModal'
import Message from '../components/Message'
import clipIcon from "../assets/paperclip.svg"
import cameraIcon from "../assets/camera.svg"
import smileyIcon from "../assets/smiley.svg"
import "../styles/ChatRoom.css"
import Neutral from '../components/Neutral'

function ChatRoom({socket,username,room,messageList,setMessageList,onlineList,setOnlineList}) {

  const [message, setMessage] = useState("")
  const [file, setFile] = useState()
  const bottomRef = useRef()

  function selectFile(e) {
    setMessage(e.target.files[0].name)
    setFile(e.target.files[0])
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messageList])

  useEffect(() => {
    socket.on("recieve-message", (data) => {
        setMessageList((list) => [...list, data])
    })

    socket.on("someone-joined", (username, time) => {
        setMessageList((list) => [...list, { username: username, time: time, join: true }])
        setOnlineList((prev) => [...prev, username])
        socket.emit("i-am-online", username)
    })

    socket.on("someone-left", (username, time) => {
        setMessageList((list) => [...list, { username: username, time: time, join: false }])
        setOnlineList((prev) => prev.filter((each) => each != username))
    })

    socket.on("online-member-update", (onlinelist) => {
        onlinelist.forEach(element => {
            if (onlinelist.room = room) {
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
  }, [socket])


  // function playNotif(){
  //     let audio = new Audio("notif.mp3")
  //     audio.play()
  // }

  async function sendMessage(e) {
    if (file) {
        var time = new Date()
        // console.log(file)
        const messageData = {
            author: username,
            room: room,
            type: "file",
            body: file,
            mimetype: file.type,
            size:file.size,
            fileName: file.name,
            time: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        }
        await socket.emit("new-message", messageData)

        function getBase64(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                // console.log("this is bas64 result ", reader.result);
                return (reader.result)
            };
            reader.onerror = function (error) {
                // console.log('Error: ', error);
            };
        }

        setMessageList((list) => [...list, messageData])
        setMessage("")
        setFile("")
    }

    else if (message) {
        var time = new Date()
        const messageData = {
            room: room,
            author: username,
            message: message,
            type: "message",
            time: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        }
        await socket.emit("new-message", messageData)
        setMessageList((list) => [...list, messageData])
        setMessage("")
    }
  }

  function keypress(e) {
    e.code == "Enter" && sendMessage()
  }

  return (
    <div className='flex flex-row justify-evenly '>
 
        <div className='h-[37em] w-[40em] bg-white rounded-3xl flex flex-col items-center relative '>
          
          {/* room id */}
          <p className='text-2xl font-semibold text-center py-3 pt-4  border-b-2 w-[90%] '>{room}</p>
          
          <div className='h-[36em] w-[40em] flex flex-col items-center overflow-y-scroll mb-2 border-b-[1px]'>
            {/* all the messages */}
            {[messageList.map((each) => {
                if (each.type == "message" || each.type == "file")
                    return (<Message data={each} right={each.author == username} />)
                else return (<Neutral data={each} />)
            })]}
            {/* to automatic scroll to end */}
            <div ref={bottomRef}></div>
          </div>

          {/* the bottom bar */}
          <div className='bg-cyan-50 flex rounded-xl py-2 px-2  items-center mt-auto mb-4  bottom-8 '>
            <label className='cursor-grab'>
              <img className='h-8 mr-2' src={clipIcon}    />
              <input className='hidden' type="file" onChange={(e) => { selectFile(e) }} />
            </label>

            <input className='w-96 bg-cyan-50' name="message" onChange={(e) => { setMessage(e.target.value) }} value={message} placeholder="Type something..." onKeyDown={(e) => { keypress(e) }}/>
            <img className='h-8 ml-2 mr-2 cursor-grab' src={smileyIcon}    />
            <img className='h-8 ml-2 mr-2 cursor-grab' src={cameraIcon}    />
          </div>
        </div>

        {/* right side wala */}
        <div className='mt-14'>
            <ActiveModal title={"Online People"} list={onlineList} />
        </div>
        
    </div>
  )
}

export default ChatRoom