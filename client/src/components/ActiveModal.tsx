import React from "react";

interface activeModalType {
  title:string,
  list:string[] | null
}

const ActiveModal = ({ title, list }:activeModalType):JSX.Element => {
  return (
    <div className=" h-64 w-72 bg-white flex flex-col items-center rounded-3xl ">
      {/* Div title */}
      <div className="my-4">
        <p className="text-3xl font-black">{title}</p>
      </div>

      {/* Div list */}
      <div className="flex flex-col overflow-scroll">
        {list?.length?list.map((each) => (
          <p className="text-xl text-lime-600  font-bold py-2 px-1 border-t-[1px] border-gray-300 w-52 text-center ">
            {each}
          </p>
        )):
          <p className="text-xl text-red-400 font-bold py-2 px-1 border-t-[1px] border-gray-300 w-52 text-center ">
              Nothing to Display here
          </p>
          }
      </div>
    </div>
  );
}

export default ActiveModal;
