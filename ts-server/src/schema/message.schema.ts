import { Buffer } from 'buffer';

export interface generalMessageType {
    room:number,
    author:string,
    type:"message"|"file", 
    message:string,
    body:Buffer,
    size:number,
    mimetype:string,
    fileName:string,
    time:string
}