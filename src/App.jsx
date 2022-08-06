import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Start from "./pages/Start";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";
import { UserContext } from "./UserContext";
const App = () => {
  const [user, setUser] = useState("null");
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Start />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/chats"} element={<Chats />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
