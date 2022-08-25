import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Friend.css";
import axios  from "axios";

// user store
import userStore from "../User";

function Friend({ style, data }) {
  //*****************UserStore*******************//
  const user = userStore((state) => state.user[0]);

  //*****************UseState*******************//
  const [userProfile, setUserProfile] = useState(null);

  //*****************Fetch Function*******************//
  const fetchUserDetail = async () => {
    await axios({
      method: "POST",
      url: `https://droplikebackend.herokuapp.com/api/user/get/${user._id}`,
      withCredentials: true,
      data: {
        userId: data,
      },
    }).then((res) => {
      setUserProfile(res.data);
    });
  };

  //*****************UseEffect*******************//
  useEffect(() => {
    if (data) {
      fetchUserDetail();
    } else {
    }
  }, []);

  return (
    <div className="friendContainer" style={style}>
      <img src="/girl.jpg" className="profilePicture" alt="" />
      <div className="username">
        {userProfile && userProfile.username}
      </div>
      <img src="/add.svg" className="add" alt="" />
    </div>
  );
}

export default Friend;
