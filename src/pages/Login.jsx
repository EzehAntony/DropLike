import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";



function Login() {
  document.title = "DropLike Login";

  useEffect(() => {
    toast.success("Login", {
      hideProgressBar: true,
      theme: "colored",
      closeButton: false,
      autoClose: 2000
    })
  }, [])
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  const submit = (e) => {
    e.preventDefault();
    alert("logged In");
    navigate("/home");
  };
  return (
    <div className="login">
      <img src="/logo4.png" alt="" />
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        ' <p>{serverResponse}</p>
        <button type="submit">Log In</button>
        <h3>
          Don't have an account? <Link to="/register">Register</Link>
        </h3>
        '
      </form>

      <ToastContainer /> 
    </div>
  );
}

export default Login;
