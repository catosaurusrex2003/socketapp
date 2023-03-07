const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io") 
const corsOptions = require("./config/corsOptions.js")

app.use(cors())
const server = http.createServer(app)

const port = process.env.PORT || 3001

const io = new Server(server , corsOptions )

// console.log(corsOptions)

var online_people = [
]

app.get("/",(req,res)=>{
    res.send("meow")
})

io.on("connection",(socket)=>{
    console.log("connected on ",socket.id)

    socket.emit("rooms-update",online_people)

    socket.on("join-room",(room,username)=>{
        
        socket.join(room)

        var currentTime = new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata" ,hour: 'numeric', minute: 'numeric', hour12: true })
        
        socket.to(room).emit("someone-joined",username,currentTime)

        console.log(`user => Id: ${socket.id} Name: ${username} joined the Room: ${room}`)
        
        var bool = false

        online_people.forEach(element => {
            if(element.room==room){
                bool = true
                element.members.push(username)
            }
        });
        
        if(!bool){
            online_people.push({
                room:room,
                members:[username]
            })
        }

        console.log(online_people)
        socket.emit("online-member-update",online_people)
        online_people.forEach(element => {
            if(element.room == room){
                socket.to(room).emit("online-member-update",online_people)
            }
        });

        socket.on("disconnect",()=>{
            socket.to(room).emit("someone-left",username,currentTime)
            
            online_people.forEach((each)=>{
                if(each.room == room){
                    each.members = each.members.filter((each2)=>{
                        if(each2 != username){
                            console.log(each2)
                            return(username)                        
                        }
                    })
                    if(!each.members.length){
                        online_people = online_people.filter((each)=>{
                            if(each.room != room ){
                                return(each)
                            }
                        })
                    }
                }
            })


            console.log(`${username} left the room at ${currentTime}`)
            console.log(online_people)
            socket.to(room).emit("online-member-update",online_people)

        })
    })
    
    socket.on("new-message",(data)=>{
        console.log(data)
        socket.to(data.room).emit("recieve-message",data)
    })

    socket.emit("me", socket.id)
    console.log("emitted me")

	socket.on("disconnect", () => {
        console.log("here")
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

})

server.listen(port,()=>{
    console.log("\x1b[1m\x1b[33mS\x1b[31mE\x1b[32mR\x1b[34mV\x1b[35mE\x1b[36mR\x1b[37m \x1b[33mR\x1b[31mU\x1b[32mN\x1b[34mN\x1b[35mI\x1b[36mN\x1b[37m\x1b[33mG \x1b[31mO\x1b[32mN \x1b[34mP\x1b[35mO\x1b[36mR\x1b[37m\x1b[33mT\x1b[0m","3001")
})
