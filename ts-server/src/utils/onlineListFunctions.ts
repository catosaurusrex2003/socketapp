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
    online_people.forEach((each)=>{
        if(each.room == room){
            each.members = each.members.filter((each2)=>{
                if(each2 != username){
                    console.log(each2)
                    return(username)                        
                }
            })
            if(!each.members.length){
                var newList = online_people.filter((each)=>{
                    if(each.room != room ){
                        return(each)
                    }
                })
                setOnlinePeople(newList)
            }
        }
    })
}

export {addActivemember,removeActivemember}