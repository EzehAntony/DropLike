import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <header>

        <div className="profileRing">
          <div className="profileImg"></div>
        </div>
        <div className="profileName">Anthony Ezeh</div>
        <div className="profileUsername">@crayonne</div>

        <div className="profileNumbers">
          <div className="following">
            <p>55</p>
            <span>Following</span>
          </div>
          <div className="followers">
            <p>20</p>
            <span>Followers</span>
          </div>
          <div className="posts">
            <p>99</p>
            <span>Posts</span>
          </div>
        </div>

        <div className="buttonContainer">
            <button className="follow">Follow</button>
            <button className="message">Message</button>
            <img src="/add.svg" className="suggested" alt="" />
        </div>
      </header>

      <div className="links">
        <p className="posts">Posts</p>
        <p className="stories">Stories</p>
        <p className="videos">Videos</p>
        <p className="tagged">Tagged</p>
      </div>

      <div className="changeable">
        <div className="inner">
          
        </div>
      </div>

      
    </div>
  );
}

export default Profile;
