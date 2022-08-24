import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userStore from "../User";
import { ClapSpinner } from "react-spinners-kit";

const Login = () => {
  document.title = "DropLike Login";
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const user = userStore((state) => state.user[0]);
  const addUser = userStore((state) => state.addUser);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios({
        url: "https://droplikebackend.herokuapp.com/api/auth/login",
        method: "POST",
        withCredentials: true,
        data: {
          username: inputValue.username,
          password: inputValue.password,
        },
      }).then((res) => {
        setLoading(false);
        addUser(res.data);
        toast.success("Logged In", {
          theme: "colored",
          autoClose: 2000,
          hideProgressBar: true,
          isLoading: false,
          onClose: () => {
            navigate(`/home/${user._id}`);
          },
        });
      });
    } catch (error) {
      setLoading(false);
      let message = "";
      if (error.response.data) {
        message = error.response.data;
      } else {
        message = error.message;
      }
      toast.error(message, {
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
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
        <button type="submit">
          <ClapSpinner size={20} loading={loading} />
          {!loading && "Login"}
        </button>
        <h3>
          Don't have an account? <Link to="/register">Register</Link>
        </h3>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
