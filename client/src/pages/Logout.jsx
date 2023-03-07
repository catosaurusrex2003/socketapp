import React from "react";

function LogoutPage({setCurrentPage}) {

  function logOutClick(params) {
    if(params){
        // console.log("closing")
        window.location.reload()
    }
    else{
        setCurrentPage("home")
    }
  }

  return (
    <div className="flex justify-center">
      <div className="h-80 w-[33em] flex flex-col text-center  bg-white rounded-3xl justify-evenly">
        <p className=" text-5xl">Do you want to quit ?</p>
        <div className="flex flex-row justify-evenly ">
          <div className="h-16 w-32 bg-green-500 text-3xl flex justify-center rounded-3xl items-center" onClick={()=>logOutClick(1)}>
            YES
          </div>
          <div className="h-16 w-32 bg-red-500 text-3xl flex justify-center rounded-3xl items-center" onClick={()=>logOutClick(0)}>
            NO
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
