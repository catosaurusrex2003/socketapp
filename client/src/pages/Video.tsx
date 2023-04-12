import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
// @ts-ignore
import Peer from "simple-peer"
import PurpleButton from "../components/PurpleButton";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard"
// @ts-ignore
import phone1 from "../assets/phone1.png";
// @ts-ignore
import phone2 from "../assets/phone2.png";
// @ts-ignore
import callCut from "../assets/cutcall.svg";
import { Socket } from "socket.io-client";
import AllContext from "../context/allContext";

interface videoPagePropsType {
	socket:Socket,
}

const VideoPage = ({socket}:videoPagePropsType):JSX.Element => {
  	const myVideo = useRef<HTMLVideoElement>()
	const userVideo = useRef<HTMLVideoElement>()
	const connectionRef = useRef<Peer>()
	
	const [stream, setStream] = useState<MediaStream>()
	const [receivingCall, setReceivingCall] = useState<boolean>(false)
	const [caller, setCaller] = useState<string>("")
	// i dont know what type to put in this place so i put Peer and lets see if error comes
	const [callerSignal, setCallerSignal] = useState<Peer>()
	const [callAccepted, setCallAccepted] = useState<boolean>(false)
	const [idToCall, setIdToCall] = useState<string>("")
	const [callEnded, setCallEnded] = useState<boolean>(false)
	const [name, setName] = useState<string>("")
	const [faltu , setFaltu] = useState<boolean>(true)
	const {me} = useContext(AllContext)


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
  

	const callUser = (id:string) => {

    // console.log("calling a user")

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})

		peer.on("signal", (data:BufferSource) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream:MediaStream) => {
			userVideo.current!.srcObject = stream
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
		peer.on("signal", (data:BufferSource) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream:MediaStream) => {
			userVideo.current!.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {

    // console.log("call ended")

		setCallEnded(true)
		if(connectionRef.current)
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
              ref={myVideo as LegacyRef<HTMLVideoElement> }
              autoPlay
            />
          ) : null}
          {
            !callAccepted?
            <>
              <div className="mt-5">
                <CopyToClipboard text={me}  >
                  <PurpleButton  text={"Copy Your ID"} />
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
						<video id="userVideo" className="h-80 border-4 border-purple-400" playsInline ref={userVideo as LegacyRef<HTMLVideoElement> } autoPlay/>
            :null
          }
        </div>
      </div>
      <img className="h-10 mt-10 " src = {callCut} onClick={leaveCall} />
    </div>
  );
}

export default VideoPage;
