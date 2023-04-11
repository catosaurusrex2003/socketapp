import { online_people , setOnlinePeople } from "../db/onlineList";


const addActivemember = (room:string,username:string) => {
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

const removeActivemember = (room:string,username:string) => {
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

const addTypingmember = (room:string,username:string) => {
    online_people.forEach(element => {
    if(element.room==room){
        if(element.typing){
            if(!element.typing.includes(username)){
                element.typing.push(username)
            }
        }
        else{
            element.typing = []
            element.typing.push(username)
        }
        console.log(element)
    }
    });
}

const removeTypingmember = (room:string,username:string) => {
    online_people.forEach((element)=>{
    if(element.room == room){
        element.typing = element.typing.filter((each)=>each != username)
        console.log(element)
    }
    })
}

export {addActivemember,removeActivemember,addTypingmember,removeTypingmember}