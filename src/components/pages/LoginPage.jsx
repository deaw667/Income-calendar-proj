import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ userlist, setuserlogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("setuserlogin");
    if (loggedIn === "true") {
      navigate("/mainpage");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = userlist.find(
      (u) => u.user === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("setuserlogin", "true");
      navigate("/mainpage");
    } else {
      alert("Your password or username is incorrect");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={!password.trim() || !username.trim()}
              className={`w-full py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !password.trim() || !username.trim()
                  ? "hover:cursor-not-allowed bg-gray-100 hover:bg-gray-400"
                  : "hover:cursor-pointer bg-blue-500 text-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/register");
              }}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
