import { Buffer } from 'buffer';

export interface generalMessageType {
    room?:string,
    author?:string,
    username?:string,
    join?:boolean,
    type?:"message"|"file", 
    message?:string,
    body?:string|Blob,
    size?:number,
    mimetype?:string,
    fileName?:string,
    time:string
}