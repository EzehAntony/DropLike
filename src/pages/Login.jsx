import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userStore from "../User";

const Login = () => {
  document.title = "DropLike Login";
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addUser = userStore((state) => state.addUser);
  const user = userStore((state) => state.registeredUser[0]);
  const clearUser = userStore((state) => state.addRegisteredUser);
  useEffect(() => {
    if (user) {
      autoLogin();
    } else {
    }
  }, []);

  const autoLogin = async () => {
    try {
      toast.loading("logging in...", {
        theme: "colored",
        type: "info",
        toastId: "login",
      });
      await axios({
        url: "https://droplikebackend.herokuapp.com/api/auth/login",
        method: "POST",
        withCredentials: true,
        data: {
          username: user.username,
          password: user.password,
        },
      }).then((res) => {
        clearUser([]);
        addUser(res.data);
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

  const submit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("logging in...", {
        theme: "colored",
        type: "info",
        toastId: "login",
      });
      await axios({
        url: "https://droplikebackend.herokuapp.com/api/auth/login",
        method: "POST",
        withCredentials: true,
        data: {
          username: username,
          password: password,
        },
      }).then((res) => {
        addUser(res.data);
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
      {!user && (
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
        </form>
      )}
      {user && (
        <form className="formTwo">
          <p>Automatic Login detected wait for redirection</p>
        </form>
      )}

      <ToastContainer />
    </div>
  );
};

export default Login;

/* {
  "_id": "62eb470392306d95ed89d964",
  "firstname": "anthony",
  "lastname": "Ezeh",
  "username": "crayonne",
  "isAdmin": false,
  "followings": [],
  "followers": [],
  "profile": "",
  "bio": "",
  "createdAt": "2022-08-04T04:11:47.270Z",
  "updatedAt": "2022-08-04T04:11:47.270Z",
  "__v": 0
}  */
