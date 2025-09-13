import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ registerUser, userlist }) => {
  const [regisname, addRegisname] = useState("");
  const [regispass, addRegisPass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const navigate = useNavigate();

  const handleregister = (e) => {
    e.preventDefault();

    const foundUser = userlist.find((u) => u.user === regisname);

    if (foundUser) {
      alert("user name or password has been taken try other");
    } else if (regispass === confirmpass) {
      registerUser({ user: regisname, password: regispass });
      navigate("/");
    } else {
      alert("your password is not match");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleregister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={regisname}
              onChange={(e) => addRegisname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={regispass}
              onChange={(e) => addRegisPass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmpass}
              onChange={(e) => setconfirmpass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={
                !regisname.trim() || !regispass.trim() || !confirmpass.trim()
              }
              className={`w-full py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !regisname.trim() || !regispass.trim() || !confirmpass.trim()
                  ? "hover:cursor-not-allowed bg-gray-100 hover:bg-gray-400"
                  : "hover:cursor-pointer bg-blue-500 text-white"
              }`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/");
              }}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
            >
              Go Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
