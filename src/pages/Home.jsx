import React from "react";
import { useContext } from "react";
import Post from "../components/Post";
import { UserContext } from "../UserContext";
import "./Home.css";
import Footer from "../components/Footer";

function Home() {
  document.title = "Homepage";
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="home">
      <header>
        <img src="/box.svg" className="logo" alt="" />
        <input type="text" placeholder="Ninja, what on your mind?" />
      </header>
      <div className="home-main">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
