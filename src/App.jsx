import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./components/pages/Mainpage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { useState, useEffect } from "react";

function App() {
  const [userlist, AddUser] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers
      ? JSON.parse(savedUsers)
      : [{ user: "eddie556", password: "75100" }];
  });

  const [userlogged, setuserlogin] = useState(false);

  const registerUser = (newUser) => {
    AddUser((prev) => [...prev, newUser]);
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userlist));
  }, [userlist]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              userlist={userlist}
              setuserlogin={setuserlogin}
              userlogged={userlogged}
            />
          }
        />
        <Route
          path="/main"
          element={<Mainpage setuserlogin={setuserlogin} />}
        />
        <Route
          path="/register"
          element={
            <RegisterPage userlist={userlist} registerUser={registerUser} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
