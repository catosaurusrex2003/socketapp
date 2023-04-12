import React, { useContext } from "react";
import AllContext from "../context/allContext";

const SettingsPage = () => {

  const { theme, setTheme } = useContext(AllContext);

  console.log(theme)

  setTimeout(()=>{
    setTheme((prev) => prev+"l")
  },2000)

  console.log("mnehdi is ",theme)

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
              theme == "light" ? "bg-slate-300" : null
            } text-lg  font-bold py-2 px-1 border-t-[1px] border-gray-300 w-52 text-center `}
            onClick={()=>setTheme("light")}
          >
            Light
          </p>
          <p
            className={` ${
              theme == "dark" ? "bg-slate-300" : null
            } text-lg  font-bold py-2 px-1 border-t-[1px] border-gray-300 w-52 text-center `}
            onClick={()=>setTheme("dark")}
          >
            Dark
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
