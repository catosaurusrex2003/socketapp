export interface incomingCallData {
    userToCall: string,
    signalData: any,
    from: string,
    name: string
}

export interface answerCallData {
    signal:any,
    to:string
}