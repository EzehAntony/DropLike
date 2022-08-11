import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Footer.css";

//import user store
import userStore from "../User";

function Footer() {
  const user = userStore((state) => state.user[0]);
  return (
    <div className="footer">
      <Link to={`/home/${user._id}`}>
        <img src="/box-white.svg" alt="" />
      </Link>
      <Link to="/search">
        <img src="/search.svg" alt="" />
      </Link>
      <Link to={`/profile/${user._id}`}>
        <div className="home-circle">
          <img src="/girl.jpg" alt="" />
        </div>
      </Link>

      <Link to="/home">
        <img src="/add.svg" alt="" />
      </Link>
      <Link to="/home">
        <img src="/add.svg" alt="" />
      </Link>
    </div>
  );
}

export default Footer;
