import React, { createContext, useState } from 'react';
import { generalMessageType } from '../types/message.type';

type AllProviderProp = {
  children:React.ReactNode
}

type AllContextType = {
  messageList:generalMessageType[],
  setMessageList:React.Dispatch<React.SetStateAction<generalMessageType[]>>,
  onlineList:string[],
  setOnlineList:React.Dispatch<React.SetStateAction<string[] >>,
  activeRooms:string[]| null,
  setActiveRooms:React.Dispatch<React.SetStateAction<string[] | null>>,
  username : string,
  setUsername : React.Dispatch<React.SetStateAction<string>>,
  room : string,
  setRoom : React.Dispatch<React.SetStateAction<string>>,
  showChat : boolean,
  setShowChat : React.Dispatch<React.SetStateAction<boolean>>,
  me : string,
  setMe : React.Dispatch<React.SetStateAction<string>>,
  currentPage : string,
  setCurrentPage : React.Dispatch<React.SetStateAction<string>>,
  theme : string,
  setTheme : React.Dispatch<React.SetStateAction<string>>
};


const AllContext = createContext<AllContextType>({
  messageList : [] ,
  setMessageList : () => {} ,
  onlineList: [], 
  setOnlineList : () => {} ,
  activeRooms: [],
  setActiveRooms: () => {} ,
  username : "" ,
  setUsername : () => {} ,
  room : "" , 
  setRoom : () => {} ,
  showChat : false ,
  setShowChat : () => {} ,
  me : "",
  setMe : () => {} ,
  currentPage : "home",
  setCurrentPage : () => {} ,
  theme : "light" ,
  setTheme : () => {} 
});

export const AllProvider = ({ children }:AllProviderProp):JSX.Element => {

  // list of messages
  const [messageList, setMessageList] = useState<generalMessageType[]>([]);
  // list of online people
  const [onlineList, setOnlineList] = useState<string[]>([]);
  //  list of online rooms
  const [activeRooms, setActiveRooms] = useState<string[] | null>([]);
  // username of the person who joined
  const [username, setUsername] = useState<string>("");
  // the room id of the socket connection
  const [room, setRoom] = useState<string>("");
  // a bool to know whether the user  has joined a room or not
  const [showChat, setShowChat] = useState<boolean>(false);
  // auto generated user id used to connect video via peerjs
  const [me, setMe] = useState<string>("");
  // defines the page which the user is currenlty on, can take values home , chat , video , notif , settings , logout
  const [currentPage, setCurrentPage] = useState<string>("home");
  // can take values light dark purple yellow green
  const [theme, setTheme] = useState<string>("yellow");

  // const [theme, setTheme] = useState('light');



  return (
    <AllContext.Provider value={{ messageList , setMessageList , onlineList,setOnlineList ,activeRooms ,setActiveRooms ,username ,setUsername
     ,room ,setRoom ,showChat ,setShowChat ,me ,setMe ,currentPage,setCurrentPage ,theme ,setTheme  }}>
      {children}
    </AllContext.Provider>
  );
};

export default AllContext;
