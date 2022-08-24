import React from "react";
import "./Start.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { ClapSpinner } from "react-spinners-kit";

function Start() {
  document.title = "DropLike Welcome!";
  const navigate = useNavigate();

  useEffect(() => {
    toast.warning(
      "Welcome",
      {
        theme: "colored",
        closeButton: false,
        onClose: () => {
          navigate("/register");
        },
        autoClose: 1500,
        icon: "",
      },
      []
    );
  });

  return (
    <div className="start">
      <img src="/logo4.png" className="logo" alt="" />
      <h3>droplike . . .</h3>


      <ToastContainer />
    </div>
  );
}

export default Start;
