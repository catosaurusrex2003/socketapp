const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io") 

app.use(cors())
const server = http.createServer(app)

const io = new Server(server , {
    cors: {
        origin: "http://localhost:3000"
    }
})


app.get("/",(req,res)=>{
    res.send("meow")
})

io.on("connection",(socket)=>{

    console.log("connected on ",socket.id)
    
    socket.on("join-room",(room,username)=>{
        
        socket.join(room)

        var time = new Date()
        var currentTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        socket.to(room).emit("someone-joined",username,currentTime)
        console.log(`user => Id: ${socket.id} Name: ${username} joined the Room: ${room}`)

        socket.on("disconnect",()=>{
            socket.to(room).emit("someone-left",username,currentTime)
            console.log(`${username} left the room at ${currentTime}`)
        })
    })
    

    socket.on("new-message",(data)=>{
        socket.to(data.room).emit("recieve-message",data)
    })

})

server.listen("3001",()=>{
    console.log("\x1b[1m\x1b[33mS\x1b[31mE\x1b[32mR\x1b[34mV\x1b[35mE\x1b[36mR\x1b[37m \x1b[33mR\x1b[31mU\x1b[32mN\x1b[34mN\x1b[35mI\x1b[36mN\x1b[37m\x1b[33mG \x1b[31mO\x1b[32mN \x1b[34mP\x1b[35mO\x1b[36mR\x1b[37m\x1b[33mT\x1b[0m","3001")
})
