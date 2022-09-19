import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Footer.css";

//import user store
import userStore from "../User";

function Footer() {
  const user = userStore((state) => state.user);
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
          {user?.gender == "m" && <img src="/male.jpg" alt="" />}
          {user?.gender == "f" && <img src="/henessy.jpg" alt="" />}
          {!user && <img src="/noImg.png" alt="" />}
        </div>
      </Link>

      <Link to="/newpost">
        <img src="/add.svg" className="addimg" alt="" />
      </Link>
      <Link to="/logout">
        <img src="/logout.svg" alt="" />
      </Link>
    </div>
  );
}

export default Footer;
