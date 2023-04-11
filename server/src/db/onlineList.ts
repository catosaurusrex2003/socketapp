import { onlinePeopleType } from "../schema/onlinePeople.schema";


var online_people:onlinePeopleType[] = [

]

const setOnlinePeople = (newList :onlinePeopleType[] ) => {
    online_people = newList
}

export {online_people,setOnlinePeople}