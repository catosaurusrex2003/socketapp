export interface onlinePeopleType {
    room:string,  //room id
    members:string[], //total members in that room
    typing?:string[],//username of people who are typing in that room
}