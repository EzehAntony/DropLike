import React from "react";
import "./Start.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function Start() {
  document.title = "DropLike Welcome!";
  const navigate = useNavigate();


  useEffect(() => {
    toast.success(
      "Welcome",
      {
        theme: "colored",
        closeButton: false,
        hideProgressBar: true,
        onClose: () => {
          navigate("/register");
        },
        autoClose: 2000,
      },
      []
    );
  });

  return (
    <div className="start">
      <img className="logo" src="/logo4.png" alt="logo" />
      <div className="welcome">
        <h3>
          Welcome to <span>DropLike</span>
        </h3>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Start;
