import React from "react";

function SettingsPage({ currentTheme ,setCurrentTheme }) {


  return (
    <div className="flex justify-center">
      <div className=" h-64 w-72 bg-white flex flex-col items-center rounded-3xl ">
        {/* Div title */}
        <div className="my-4">
          <p className="text-2xl font-black">Theme</p>
        </div>

        {/* Div list   bg-slate-300 */}
        <div className="flex flex-col overflow-scroll">
          <p
            className={` ${
              currentTheme == "light" ? "bg-slate-300" : null
            } text-lg  font-bold py-2 px-1 border-t-[1px] border-gray-300 w-52 text-center `}
            onClick={()=>setCurrentTheme("light")}
          >
            Light
          </p>
          <p
            className={` ${
              currentTheme == "dark" ? "bg-slate-300" : null
            } text-lg  font-bold py-2 px-1 border-t-[1px] border-gray-300 w-52 text-center `}
            onClick={()=>setCurrentTheme("dark")}
          >
            Dark
          </p>
          <p
            className={` ${
              currentTheme == "yellow" ? "bg-slate-300" : null
            } text-lg  font-bold py-2 px-1 border-t-[1px] border-gray-300 w-52 text-center `}
            onClick={()=>setCurrentTheme("yellow")}
          >
            Yellow
          </p>
          <p
            className={` ${
              currentTheme == "green" ? "bg-slate-300" : null
            } text-lg  font-bold py-2 px-1 border-t-[1px] border-gray-300 w-52 text-center `}
            onClick={()=>setCurrentTheme("green")}
          >
            Green
          </p>
          <p
            className={` ${
              currentTheme == "purple" ? "bg-slate-300" : null
            } text-lg  font-bold py-2 px-1 border-t-[1px] border-gray-300 w-52 text-center `}
            onClick={()=>setCurrentTheme("purple")}
          >
            Purple
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
