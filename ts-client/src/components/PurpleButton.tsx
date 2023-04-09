import React from "react";

interface purpleButtonPropsType {
  text:string,
  onClick?: () => void
}

const PurpleButton = ({ text, onClick }:purpleButtonPropsType) : JSX.Element => {
  return (
    <button
      className=" h-12 w-fit px-5 tracking-widest rounded-2xl bg-violet-600 text-white font-bold"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default PurpleButton;
