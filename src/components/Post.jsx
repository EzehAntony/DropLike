import React from "react";
import "./Post.css";

function Post() {
  return (
    <div className="post">
      <header>
        <div className="userImage"></div>
        <div className="containerii">
          <div className="username">crayonne.io</div>
        </div>
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