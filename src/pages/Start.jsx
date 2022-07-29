import React from "react";
import "./Start.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Start() {
  document.title = "DropLike Welcome!";
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    toast.success("Welcome", {
      theme: "colored",
      closeButton: false,
      hideProgressBar: true,
      onClose: () => {
        navigate("/register");
      },
      autoClose: 2000,
    });
  };

  return (
    <div className="start">
      <img className="logo" src="/logo4.png" alt="logo" />
      <div className="welcome">
        <h3>
          Welcome to <span>DropLike</span>
        </h3>
        <button onClick={signUp}>Sign Up</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Start;
