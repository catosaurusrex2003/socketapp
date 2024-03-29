import React, { useContext } from "react";
// @ts-ignore
import homeIcon from "../assets/home_icon.svg";
// @ts-ignore
import bellIcon from "../assets/bell.svg";
// @ts-ignore
import chatIcon from "../assets/chat.svg";
// @ts-ignore
import logoutIcon from "../assets/logout.svg";
// @ts-ignore
import settingIcon from "../assets/setting.svg";
// @ts-ignore
import videoIcon from "../assets/videorecorder.svg";

import AllContext from "../context/allContext";

const Navbar = () => {
  
  const {currentPage,setCurrentPage} = useContext(AllContext);

  const activeCss = "bg-violet-700 border-t-4 border-yellow-400";

  return (
    <div className=" flex justify-center ">
      <div className=" bg-violet-500 h-14 w-[35em] flex flex-row justify-evenly rounded-xl mt-2 ">
        <div
          className={` ${
            currentPage == "home" ? activeCss : null
          }  w-14 flex flex-col justify-center `}
          onClick={() => setCurrentPage("home")}
        >
          <img className="h-8" src={homeIcon} />
        </div>
        <div
          className={` ${
            currentPage == "chat" ? activeCss : null
          }  w-14 flex flex-col justify-center `}
          onClick={() => setCurrentPage("chat")}
        >
          <img className="h-7" src={chatIcon} />
        </div>
        <div
          className={` ${
            currentPage == "video" ? activeCss : null
          }  w-14 flex flex-col justify-center `}
          onClick={() => setCurrentPage("video")}
        >
          <img className="h-9" src={videoIcon} />
        </div>
        <div
          className={` ${
            currentPage == "notif" ? activeCss : null
          }  w-14 flex flex-col justify-center `}
          onClick={() => setCurrentPage("notif")}
        >
          <img className="h-8" src={bellIcon} />
        </div>
        <div
          className={` ${
            currentPage == "settings" ? activeCss : null
          }  w-14 flex flex-col justify-center `}
          onClick={() => setCurrentPage("settings")}
        >
          <img className="h-8" src={settingIcon} />
        </div>
        <div
          className={` ${
            currentPage == "logout" ? activeCss : null
          }  w-14 flex flex-col justify-center `}
          onClick={() => setCurrentPage("logout")}
        >
          <img className="h-8" src={logoutIcon} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
