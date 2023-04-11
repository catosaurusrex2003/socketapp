// types importing
import { generalMessageType } from './schema/message.schema';
import { answerCallData, incomingCallData } from './schema/video.schema';
// import { onlinePeopleType } from './schema/onlinePeople.schema';


import { online_people } from './db/onlineList';
import { addActivemember , addTypingmember, removeActivemember, removeTypingmember } from './utils/onlineListFunctions';
import logger from './utils/logger';

import express, { Application,Request, Response } from "express"
const http = require("http")
const {Server} = require("socket.io")

import corsOptions from './config/corsOptions';


const port = process.env.PORT || 3001

const app:Application = express()
const server = http.createServer(app)

const io = new Server(server , corsOptions )

app.get("/",(req:Request,res:Response)=>{
    logger.info("hitted")
    res.send("sadasd")
})


app.post("/",(req:Request,res:Response)=>{
    logger.info(req)
    res.send("oksdfsdfsdf")
})

io.on("connection",(socket:any)=>{
    
    logger.info("connected on "+socket.id)

    socket.emit("rooms-update",online_people)

    socket.on("join-room",(room:string,username:string)=>{
        try {
            socket.join(room)
        } catch (error) {
            logger.error(error)
        }
        

        var currentTime = new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata" ,hour: 'numeric', minute: 'numeric', hour12: true })
        socket.to(room).emit("someone-joined",username,currentTime)
        logger.warn(`user => Id: ${socket.id} Name: ${username} joined the Room: ${room}`)
        addActivemember(room , username)
        logger.info(online_people)

        socket.emit("online-member-update",online_people)
        socket.to(room).emit("online-member-update",online_people)

        // -----------------------------------------------------------------------------------------------------

        // i dont know why i put this here this is not needed. the above line does the same work
        // online_people.forEach(element => {
        //     if(element.room == room){
        //         socket.to(room).emit("online-member-update",online_people)
        //     }
        // });

        // -----------------------------------------------------------------------------------------------------

        socket.on("disconnect",()=>{
            socket.to(room).emit("someone-left",username,currentTime)
            
            removeActivemember(room,username)

            logger.warn(`${username} left the room at ${currentTime}`)
            logger.warn(online_people)
            socket.to(room).emit("online-member-update",online_people)

        })
    })
    
    socket.on("new-message",(data:generalMessageType)=>{
        console.log("socket something" , socket.id , "socket something" , socket.room , "socket something" , socket.rooms)
        logger.info(data)
        socket.to(data.room).emit("recieve-message",data)   
    })

    socket.on("iam-typing",(room:string,username:string)=>{
        console.log(username,"is typing")
        addTypingmember(room,username)
        online_people.forEach((element) => {
            // console.log(element)
            if(element.room == room){
                socket.to(room).emit("typing-update",element.typing)
            }
        })
        console.log("emitted")
    })

    // i-finished-typing

    socket.on("i-finished-typing",(room:string,username:string)=>{
        console.log(username,"finished typing")
        removeTypingmember(room,username)
        online_people.forEach((element) => {
            // console.log(element)
            if(element.room == room){
                socket.to(room).emit("typing-update",element.typing)
            }
        })
        console.log("emitted")
    })
    
    socket.emit("me", socket.id)
    logger.info("emitted me")

    //  not needed
	// socket.on("disconnect", ():void => {
	// 	socket.broadcast.emit("callEnded")
	// })

	socket.on("callUser", (data:incomingCallData) => {
        logger.info("callUser")
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data:answerCallData) => {
        logger.info("answerCall")
		io.to(data.to).emit("callAccepted", data.signal)
	})

})

server.listen(port,()=>{
    console.log("\x1b[1m\x1b[33mS\x1b[31mE\x1b[32mR\x1b[34mV\x1b[35mE\x1b[36mR\x1b[37m \x1b[33mR\x1b[31mU\x1b[32mN\x1b[34mN\x1b[35mI\x1b[36mN\x1b[37m\x1b[33mG \x1b[31mO\x1b[32mN \x1b[34mP\x1b[35mO\x1b[36mR\x1b[37m\x1b[33mT\x1b[0m","3001")
})
