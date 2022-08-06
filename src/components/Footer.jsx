import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <Link to="/home">
        <img src="/box-white.svg" alt="" />
      </Link>
      <Link to="/home">
        <img src="/search.svg" alt="" />
      </Link>
      <Link to="/profile">
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
