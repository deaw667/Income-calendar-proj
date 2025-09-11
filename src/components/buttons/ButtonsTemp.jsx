import React from "react";

const ButtonsTemp = ({ isdisable , buttonText , buttonFun}) => {
  return (
    <button
      type="submit"
      disabled={isdisable}
      className={`px-2 py-1 text-xs rounded text-white ${
        !isdisable.trim()
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {buttonText}
    </button>
  );
};

export default ButtonsTemp;
