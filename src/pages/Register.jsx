import React from "react";
import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  document.title = "DropLike Register";

  useEffect(() => {
    toast.success("Register", {
      theme: "colored",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
    });
  }, []);

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  const submit = (e) => {
    e.preventDefault();

    toast.success(
      `Hi, ${firstName} your username will be saved as ${username} and users can now find you with that as your ID.  Your password is ${password}.`,
      {
        hideProgressBar: true,
        theme: "colored",
        closeButton: false,
        autoClose: 5000,
      }
    );
  };
  return (
    <div className="register">
      <img src="/logo4.png" alt="" />
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="firstname"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          required={true}
        />
        <input
          type="text"
          placeholder="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required={true}
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />

        <p>{serverResponse}</p>
        <button type="submit" onSubmit={submit}>
          Sign Up
        </button>
        <h3>
          Already have an account? <Link to="/login">login</Link>
        </h3>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
