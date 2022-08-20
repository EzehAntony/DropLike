import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userStore from "../User";

const Login = () => {
  document.title = "DropLike Login";
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });  

  const user = userStore((state) => state.user[0]);
  const addUser = userStore((state) => state.addUser);

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
          username: inputValue.username,
          password: inputValue.password,
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
            navigate(`/home/${user._id}`);
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
          value={inputValue.username}
          onChange={(e) =>
            setInputValue((prev) => ({
              ...inputValue,
              username: e.target.value,
            }))
          }
          required={true}
        />
        <input
          type="text"
          autoComplete="true"
          placeholder="password"
          value={inputValue.password}
          onChange={(e) =>
            setInputValue((prev) => ({
              ...inputValue,
              password: e.target.value,
            }))
          }
          required={true}
        />
        <button type="submit">Log In</button>
        <h3>
          Don't have an account? <Link to="/register">Register</Link>
        </h3>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
