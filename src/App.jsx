import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Start from "./pages/Start";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";
import Search from "./pages/Search";
import NewPost from "./pages/NewPost";
import userStore from "./User";

const App = () => {
  const user = userStore((state) => state.user[0]);
  useEffect(
    () => window.scrollTo(0, 0),
    [Home, Profile, Chats, Search, NewPost]
  );
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Start />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/home/:id"} element={<Home />} />
          {!user && <Route path={"/home"} element={<Login />} />}
          <Route path={"/profile/:id"} element={<Profile />} />
          {!user && <Route path={"/profile"} element={<Login />} />}
          <Route path={"/search"} element={<Search />} />
          {!user && <Route path={"/search"} element={<Login />} />}
          {!user && <Route path={"/chats"} element={<Chats />} />}
          <Route path={"/chats"} element={<Chats />} />
          <Route path={"/newpost"} element={<NewPost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
