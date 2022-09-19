import React from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import userStore from "../User";

function Logout() {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);
  const addUser = userStore((state) => state.addUser);
  const logout = () => {
    addUser("");
    navigate("/login");
  };
  const profile = () => {
    navigate(`/profile/${user._id}`);
  };
  return (
    <div className="logout">
      <div className="minProfile">
        <div className="left">
          {user?.gender == "m" && <img src="/male.jpg" alt="" />}
          {user?.gender == "f" && <img src="/henessy.jpg" alt="" />}
          {!user && <img src="/noImg.png" alt="" />}
        </div>
        <div className="right">
          <h2>
            {user.firstname} {user.lastname}{" "}
          </h2>
          <h3>@{user.username}</h3>
        </div>
      </div>

      <ul>
        <li onClick={profile}>
          <div className="left">
            <img src="/person.svg" alt="" />
          </div>
          <div className="right">My Profile</div>
        </li>

        <li>
          <div className="left">
            <img src="/info.svg" alt="" />
          </div>
          <div className="right">about app</div>
        </li>

        <li onClick={logout}>
          <div className="left">
            <img src="/logout.svg" alt="" />
          </div>
          <div className="right">logout</div>
        </li>
      </ul>
      <Footer />
    </div>
  );
}

export default Logout;
