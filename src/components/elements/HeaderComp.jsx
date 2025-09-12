import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderComp = ({ setCalen, date, showCalen }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-[#f8fafd] w-full shadow-lg relative z-10">
      {/* Left Zone */}
      <div className="flex-1 w-full sm:w-auto sm:max-w-[300px]">
        <HeadZone setCalen={setCalen} showCalen={showCalen} />
      </div>

      {/* Middle Zone */}
      <div className="flex-1 min-w-[150px]">
        <MiddleZone date={date} />
      </div>

      {/* End Zone */}
      <div className="flex-1 min-w-[150px]">
        <EndZone />
      </div>
    </div>
  );
};

export const HeadZone = ({ setCalen, showCalen }) => {
  return (
    <div>
      <button
        className={`px-2 py-1 text-xs rounded text-white hover:bg-gray-500 hover:cursor-pointer ${
          showCalen ? "bg-red-500" : "bg-green-600"
        }`}
        onClick={() => setCalen((prev) => !prev)}
      >
        {showCalen ? "hide calendar" : "show calendar"}
      </button>
    </div>
  );
};

export const MiddleZone = ({ date }) => {

  return (
    <div className="flex items-center justify-center gap-4">
      <h2>
        {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </h2>
    </div>
  );
};

export const EndZone = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.setItem("setuserlogin", "false")
    navigate('/')
  }
  return (
    <div>
      <button onClick={handlelogout} className="px-2 py-1 text-xs bg-red-500 rounded text-white hover:bg-gray-500 hover:cursor-pointer">
        Logout
      </button>
    </div>
  );
};

export default HeaderComp;
