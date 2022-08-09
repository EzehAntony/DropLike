import React from "react";
import "./Post.css";
import userStore from "../User";

function Post() {
  const user = userStore((state) => state.user[0]);
  return (
    <div className="post">
      <header className="post-header">
        <div className="userImage"></div>
        <div className="username">@{user && user.username}</div>
      </header>
      <div className="mainSection">
        <div className="caption">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          consequatur, adipisci quae quis voluptatibus in.
        </div>
        <div className="image"></div>
        <div className="action">
          <div className="like"></div>
          <div className="comment"></div>
          <div className="share"></div>
        </div>
        <p>View comments</p>
      </div>
    </div>
  );
}

export default Post;
