import React from "react";
import { useEffect } from "react";
import "./Post.css";
import axios from "axios";
import userStore from "../User";
import { useState } from "react";

function Post({ data, loading }) {
  const user = userStore((state) => state.user[0]);

  const [userProfile, setUserProfile] = useState(null);

  const fetchUserDetail = async () => {
    await axios({
      method: "POST",
      url: `https://droplikebackend.herokuapp.com/api/user/get/${user._id}`,
      withCredentials: true,
      data: {
        userId: data?.userId,
      },
    }).then((res) => {
      setUserProfile(res.data);
    });
  };
  useEffect(() => {
    if (data) {
      fetchUserDetail();
    } else {
    }
  }, []);
  return (
    <div className="post">
      <div className="post-header">
        {data && <img src="/henessy.jpg" className="userImage" />}

        {userProfile && (
          <div className="username">
            {userProfile.username}
            {loading && "fetching..."}
          </div>
        )}
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
