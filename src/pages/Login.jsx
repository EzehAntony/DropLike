import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../UserContext";

function Login() {
  document.title = "DropLike Login";
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("logging in...", {
        theme: "colored",
        type: "info",
        toastId: "login",
      });
      console.log(username, password);
      await axios({
        url: "https://droplikebackend.herokuapp.com/api/auth/login",
        method: "POST",
        withCredentials: true,
        data: {
          username: username,
          password: password,
        },
      }).then((res) => {
        setUser(res.data);
        toast.update("login", {
          render: "Logged in",
          theme: "colored",
          autoClose: 2000,
          isLoading: false,
          type: "success",
          onClose: () => {
            navigate("/home");
          },
        });
      });
    } catch (error) {
      let message = "";
      if (error.response.data) {
        message = error.response.data;
      } else {
        message = error.message;
      }
      toast.update("login", {
        render: `${message}`,
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };
  return (
    <div className="login">
      <img src="/logo4.png" alt="" />
      <form onSubmit={submit}>
        <input
          autoComplete="true"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <input
          type="text"
          autoComplete="true"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
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
