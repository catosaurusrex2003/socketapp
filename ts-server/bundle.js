
//  DB STUFF   ------------------------------------------------------------------------------------------------------

var online_people = [

]

const setOnlinePeople = (newList  ) => {
    online_people = newList
}


// TYPE FUNCTIONS ----------------------------------------------------------------------------------------------------

const addActivemember = (room,username) => {
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
}

const removeActivemember = (room,username) => {
    online_people.forEach((element)=>{
        if(element.room == room){
            element.members = element.members.filter((each)=> each != username )
            if(!element.members.length){
                var newList = online_people.filter((element)=> element.room!=room )
                setOnlinePeople(newList)
            }
        }
    })
}

const addTypingmember = (room,username) => {
    online_people.forEach(element => {
    if(element.room==room){
        if(element.typing){
            // console.log("1")
            if(!element.typing.includes(username)){
                // console.log(username," added in typing")
                element.typing.push(username)
            }
            // console.log(element)
        }
        else{
            // console.log("2")
            element.typing = []
            element.typing.push(username)
            // console.log(element)
        }
    }
    });
}

const removeTypingmember = (room,username) => {
    online_people.forEach((element)=>{
        if(element.room == room){
            element.typing = element.typing.filter((each)=>each != username)
            // console.log(element)
        }
    })
}


// -----------------------------------------------------------------------------------------


const express =  require("express")
const http = require("http")
const {Server} = require("socket.io")


const corsOptions = {
    cors: {
        origin: ["http://localhost:3000","http://127.0.0.1:5173","http://127.0.0.1:5174","https://mohammed-chat.netlify.app"]
    }
}


const port = process.env.PORT || 3001

const app = express()
const server = http.createServer(app)

const io = new Server(server , corsOptions )

app.get("/",(req,res)=>{
    console.log("hitted")
    res.send("hitted")
})


io.on("connection",(socket)=>{
    
    console.log("connected on "+socket.id)

    socket.emit("rooms-update",online_people)

    socket.on("join-room",(room,username)=>{
        try {
            socket.join(room)
        } catch (error) {
            console.log(error)
        }
        

        var currentTime = new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata" ,hour: 'numeric', minute: 'numeric', hour12: true })
        socket.to(room).emit("someone-joined",username,currentTime)
        // console.log(`user => Id: ${socket.id} Name: ${username} joined the Room: ${room}`)
        addActivemember(room , username)
        // console.log(online_people)

        socket.emit("online-member-update",online_people)

        // i dont know why i put this here this is not needed. the above line does the same work
        // online_people.forEach(element => {
        //     if(element.room == room){
        //         socket.to(room).emit("online-member-update",online_people)
        //     }
        // });

        socket.on("disconnect",()=>{
            socket.to(room).emit("someone-left",username,currentTime)
            
            removeActivemember(room,username)

            // console.log(`${username} left the room at ${currentTime}`)
            // console.log(online_people)
            socket.to(room).emit("online-member-update",online_people)

        })
    })
    
    socket.on("new-message",(data)=>{
        // console.log(data)
        socket.to(data.room).emit("recieve-message",data)   
    })

    socket.on("iam-typing",(room,username)=>{
        addTypingmember(room,username)
        online_people.forEach((element) => {
            // console.log(element)
            if(element.room == room){
                socket.to(room).emit("typing-update",element.typing)
            }
        })
    })

    // i-finished-typing

    socket.on("i-finished-typing",(room,username)=>{
        // console.log(username,"finished typing")
        removeTypingmember(room,username)
        online_people.forEach((element) => {
            // console.log(element)
            if(element.room == room){
                socket.to(room).emit("typing-update",element.typing)
            }
        })
    })
    
    socket.emit("me", socket.id)
    // console.log("emitted me")

    //  not needed
	// socket.on("disconnect", ():void => {
	// 	socket.broadcast.emit("callEnded")
	// })

	socket.on("callUser", (data) => {
        // console.log("callUser")
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
        // console.log("answerCall")
		io.to(data.to).emit("callAccepted", data.signal)
	})

})

server.listen(port,()=>{
    console.log("SERVER IS RUNNING ON PORT : ","3001")
})
