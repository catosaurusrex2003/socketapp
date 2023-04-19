import { Buffer } from 'buffer';

export interface generalMessageType {
    m_id:string | undefined,
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