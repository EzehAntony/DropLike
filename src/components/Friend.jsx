import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Friend.css";

// user store
import userStore from "../User";

function Friend({ style, data, loading }) {
  //click function to redirect to profile of selected profile

  return (
    <Link
      to={`/profile/${data && data._id}`}
      className="friendContainer"
      style={style}
    >
      <img src="/girl.jpg" className="profilePicture" alt="" />
      <div className="username">
        {data && data.username} {loading && "freching..."} 
      </div>
      <img src="/add.svg" className="add" alt="" />
    </Link>
  );
}

export default Friend;
