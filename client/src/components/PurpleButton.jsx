import React from "react";

function PurpleButton({ text, onClick }) {
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
