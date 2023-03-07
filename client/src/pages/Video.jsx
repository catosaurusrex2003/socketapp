import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer"
import PurpleButton from "../components/PurpleButton";
import { CopyToClipboard } from "react-copy-to-clipboard"
import phone1 from "../assets/phone1.png";
import phone2 from "../assets/phone2.png";
import callCut from "../assets/cutcall.svg";


function VideoPage({socket,me}) {
  const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef()
	
	const [stream, setStream] = useState()
	const [receivingCall, setReceivingCall] = useState(false)
	const [caller, setCaller] = useState("")
	const [callerSignal, setCallerSignal] = useState()
	const [callAccepted, setCallAccepted] = useState(false)
	const [idToCall, setIdToCall] = useState("")
	const [callEnded, setCallEnded] = useState(false)
	const [name, setName] = useState("")
	const [faltu , setFaltu] = useState(true)


	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
		.then((stream) => {
			setStream(stream)
			// console.log(myVideo.current)

			if (myVideo.current){
				myVideo.current.srcObject = stream;
			  } 
			else{
					setFaltu((prev)=>!prev)
			}
			// console.log(myVideo.current)

		})
		// .catch((error)=>{
		// 	console.log(error)
		// })
		// console.log("useEffect")

		socket.on("callUser", (data) => {
    //   console.log("call recieving")
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})

    return() => {
      socket.off("callUser")
    }
  }, [myVideo,faltu])
  

	const callUser = (id) => {

    // console.log("calling a user")

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})

		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall = () => {

    // console.log("call accepted")

		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {

    // console.log("call ended")

		setCallEnded(true)
		connectionRef.current.destroy()
	}

  return (
    <div className="flex justify-evenly flex-col ">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col items-center justify-evenly ">
          {/* NOTIF FOR COMING CALL */}
          {receivingCall && !callAccepted?
            <div className=" bg-blue-300 h-10 m-10 flex text-xl rounded-xl px-8 py-8 justify-center items-center">
              <p className=" font-semibold">Someone is calling</p>
              <img className="ml-10 h-8" src = {phone1} onClick={answerCall} />
            </div>  
            :null
          }
          

          {stream ? (
            <video
              id="myVideo"
              className="h-80 border-4 border-purple-400"
              playsInline
              muted
              ref={myVideo}
              autoPlay
            />
          ) : null}
          {
            !callAccepted?
            <>
              <div className="mt-5">
                <CopyToClipboard text={me}  >
                  <PurpleButton  text={"Copy Your ID"}/>
                </CopyToClipboard>
              </div>
              <div className="flex justify-center items-center w-auto mt-4">
                  <input
                      className="w-60 h-12 text-lg bg-yellow-50 rounded-lg p-1 px-2"
                      placeholder="Enter ID of reciever"
                      value={idToCall}
                      onChange={(e) => setIdToCall(e.target.value)} 
                  />
                  <img className="ml-2 h-10" src = {phone2} onClick={() => callUser(idToCall)} />

              </div>
            </>
          :null
          }
          
        </div>

        <div className="flex flex-col items-center justify-evenly ">
          {callAccepted && !callEnded ?
						<video id="userVideo" className="h-80 border-4 border-purple-400" playsInline ref={userVideo} autoPlay/>
            :null
          }
        </div>
      </div>
      <img className="h-10 mt-10 " src = {callCut} onClick={leaveCall} />
    </div>
  );
}

export default VideoPage;
