import React from "react";
import Post from "../components/Post";
import "./Home.css";

function Home() {
  document.title = "Homepage";
  return (
    <div className="home">
      <header>
        Header
        <img src="/logo4.png" className="logo" alt="" />
      </header>


    </div>
  );
}

export default Home;
