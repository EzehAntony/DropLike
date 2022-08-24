//React Imports
import React, { useState, useContext, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

//Toast imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//axios
import axios from "axios";

//Spinner kit import
import {ClapSpinner} from "react-spinners-kit"



function Register() {
  document.title = "DropLike Register";

  //Input state
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //Form Submit function
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios({
        url: "https://droplikebackend.herokuapp.com/api/auth/register",
        method: "POST",
        withCredentials: true,
        data: {
          firstname: input.firstName,
          lastname: input.lastName,
          username: input.username,
          password: input.password,
        },
      }).then((res) => {
        setLoading(false);
        toast.success("Registered", {
          type: "success",
          isLoading: false,
          theme: "colored",
          autoClose: 3000,
          onClose: () => {
            navigate("/login");
          },
        });
      });
    } catch (error) {
      setLoading(false);
      let message = "";
      if (error.response.data) {
        message = error.response.data;
      } else {
        message = "error";
      }
      toast(message, {
        theme: "colored",
        type: "error",
        autoClose: 2000,
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
          maxLength={15}
          minLength={5}
          value={input.firstName}
          onChange={(e) =>
            setInput({
              ...input,
              firstName: e.target.value.toLowerCase().trim(),
            })
          }
          required={true}
        />
        <input
          type="text"
          placeholder="lastname"
          value={input.lastName}
          maxLength={15}
          minLength={3}
          onChange={(e) =>
            setInput({
              ...input,
              lastName: e.target.value.toLowerCase().trim(),
            })
          }
          required={true}
        />
        <input
          type="text"
          placeholder="username"
          autoSave="true"
          value={input.username}
          minLength={5}
          maxLength={20}
          onChange={(e) =>
            setInput({
              ...input,
              username: e.target.value.toLowerCase().trim(),
            })
          }
          required={true}
        />

        <input
          type="password"
          autoSave="true"
          placeholder="password"
          value={input.password}
          minLength={5}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          maxLength={15}
          required={true}
        />

        <button type="submit" onSubmit={submit}>
          {!loading && "Sign Up"}
          <ClapSpinner  loading={loading} />
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
