import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
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
      autoClose: 2000,
    });
  }, []);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        url: "https://droplikebackend.herokuapp.com/api/auth/login",
        method: "POST",
        withCredentials: true,
        body: {
          username: username,
          password: password,
        },
      }).then((res) => {
        console.log(res);
        toast.success(
          `Successfully logged in as ${username}! You will now be redirected to the home page.`,
          {
            theme: "colored",
            closeButton: false,
            autoClose: 5000,
            onClose: () => {
              navigate("/home");
            },
          }
        );
      });
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
        autoClose: 3000,
      });
    }
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
