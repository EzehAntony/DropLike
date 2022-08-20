import React from "react";
import "./Post.css";

function Post({ data, loading }) {
  return (
    <div className="post">
      <div className="post-header">
        {data && <img src="/henessy.jpg" className="userImage" />}
        <div className="username">
          {data && `@${data.username}`}
          {loading && "fetching..."}
        </div>
      </div>
      <div className="mainSection">
        <div className="caption">
          {data && data.caption}
          {loading && "fetching..."}
        </div>
        {<img src="/girl.jpg" className="image" />}

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
