import React from "react";
import "./Post.css";

function Post({ data, loading }) {
  return (
    <div className="post">
      <header className="post-header">
        {data && <div className="userImage"></div>}
        <div className="username">
          @{data && data.username}
          {loading && "fetching..."}
        </div>
      </header>
      <div className="mainSection">
        <div className="caption">
          {data && data.caption}
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
