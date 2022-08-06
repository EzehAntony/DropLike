//React Imports
import React, { useState, useContext, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

//Toast imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//axios
import axios from "axios";

import { UserContext } from "../UserContext";

function Register() {
  document.title = "DropLike Register";
  const { user, setUser } = useContext(UserContext);

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Loading", {
        toastId: "register",
        type: "info",
      });
      await axios({
        url: "https://droplikebackend.herokuapp.com/api/auth/register",
        method: "POST",
        withCredentials: true,
        data: {
          firstname: firstName,
          lastname: lastName,
          username: username,
          password: password,
        },
      }).then((res) => {
        setUser(res.data);
        toast.update("register", {
          render: "Registered",
          type: "success",
          isLoading: false,
          theme: "colored",
          autoClose: 3000,
          onClose: () => {
            navigate("/login");
          },
        });

        setUser(res.data);
      });
    } catch (error) {
      let message = "";
      if (error.response.data) {
        message = error.response.data;
      } else {
        message = "error";
      }
      toast.update("register", {
        render: `${message}`,
        theme: "colored",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  return (
    <div className="register">
      <img src="/logo4.png" alt="" />

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="firstname"
          maxLength={20}
          minLength={5}
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          required={true}
        />
        <input
          type="text"
          placeholder="lastname"
          value={lastName}
          maxLength={20}
          minLength={5}
          onChange={(e) => setLastName(e.target.value)}
          required={true}
        />
        <input
          type="text"
          placeholder="username"
          autoSave="true"
          value={username}
          minLength={5}
          maxLength={20}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />

        <input
          type="password"
          autoSave="true"
          placeholder="password"
          value={password}
          minLength={5}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={15}
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
