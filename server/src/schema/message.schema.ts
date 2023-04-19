import { Buffer } from 'buffer';

export interface generalMessageType {
    m_id:string | undefined,
    room:string,
    author:string,
    type:"message"|"file", 
    message:string,
    body:Buffer,
    size:number,
    mimetype:string,
    fileName:string,
    time:string
}