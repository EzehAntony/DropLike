import React from "react";
import { useContext } from "react";
import Footer from "../components/Footer";
import "./Profile.css";
import userStore from "../User";
import Post from "../components/Post";

function Profile() {
  const user = userStore((state) => state.user[0]);
  return (
    <div className="profile">
      <header>
        <div className="profileRing">
          <div className="profileImg"></div>
        </div>
        <div className="profileName">
          {user && user.firstname} {user && user.lastname}
        </div>
        <div className="profileUsername">@{user && user.username} </div>

        <div className="profileNumbers">
          <div className="following">
            <p>{user && user.followings.length} </p>
            <span>Followings</span>
          </div>
          <div className="followers">
            <p>{user && user.followers.length} </p>
            <span>Followers</span>
          </div>
          <div className="posts">
            <p>{99}</p>
            <span>Posts</span>
          </div>
        </div>

        <div className="buttonContainer">
          <button className="follow">Follow</button>
          <button className="message">Message</button>
          <img src="/add.svg" className="suggested" alt="" />
        </div>
        <hr />
      </header>

      <div className="links">
        <p className="posts">Posts</p>
        <p className="posts">followers</p>
        <p className="posts">followings</p>
      </div>

      <div className="inner">
        <Post />
        <Post />
        <Post />
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
