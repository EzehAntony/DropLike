import React from "react";
import "./Friend.css";
import userStore from "../User";

function Friend({style}) {
  const user = userStore((state) => state.user[0]);
  return (
    <div className="friendContainer" style={style}>
      <img src="/girl.jpg" className="profilePicture" alt="" />
      <div className="username">{user && user.username} </div>
      <img src="/add.svg" className="add" alt="" />
    </div>
  );
}

export default Friend;
