import React from "react";
import "./Post.css";
import userStore from "../User";

function Post({ data, loading }) {
  return (
    <div className="post">
      <header className="post-header">
        <div className="userImage"></div>
        <div className="username">
          @{data && data.username}
          {loading && "fetching..."}
        </div>
      </header>
      <div className="mainSection">
        <div className="caption">
          {data && data.bio}
          {loading && "fetching..."}
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
