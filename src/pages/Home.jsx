import React from "react";
import Post from "../components/Post";
import "./Home.css";
import Footer from "../components/Footer";
import userStore from "../User";
import Friends from "../components/Friend";

function Home() {
  document.title = "Homepage";
  const user = userStore((state) => state.user[0]);

  return (
    <div className="home">
      <header>
        <img src="/box.svg" className="logo" alt="" />
        <input
          type="text"
          placeholder={`${user.username}, what is on your mind?`}
        />
        <button className="homePost">Post</button>
      </header>
      <div className="split">
        <div className="home-main">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>

        <div className="home-other">
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
