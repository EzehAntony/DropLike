//React Imports
import React from "react";
import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

//Toast imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//axios
import axios from "axios";

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
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        url: "https://droplikebackend.herokuapp.com/api/auth/register",
        method: "POST",
        withCredentials: true,
        body: {
          firstname: firstName,
          lasname: lastName,
          username: username,
          password: password,
        },
      }).then((res) => {
        console.log(res);
        toast.success(`Registered ${username}! You will now be logged in`, {
          theme: "colored",
          closeButton: false,
          autoClose: 5000,
          onClose: () => {
            navigate("/home");
          },
        });
      });
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
        autoClose: 3000,
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
