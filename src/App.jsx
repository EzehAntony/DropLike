import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Start from "./pages/Start";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Start />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/home"} element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
