import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TimelineLite, Power3 } from "gsap";
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

  let logo = useRef(null);
  let form = useRef(null);
  let button = useRef(null);
  let text = useRef(null);
  let input = useRef(null);
  const t1 = new TimelineLite({ duration: 0.8, ease: Power3.easeIn });

  useEffect(() => {
    t1.from(logo, { y: -20, opacity: 0 }, 0.2)
      .from(form, { y: 20, opacity: 0 }, 0.4)
      .from(button, { opacity: 0, x: -20 }, 0.6)
      .from(text, { opacity: 0, y: 20 }, 0.8);
  }, []);
  return (
    <div className="login">
      <img ref={(el) => (logo = el)} src="/logo4.png" alt="" />
      <form ref={(el) => (form = el)} onSubmit={submit}>
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
        <button ref={(el) => (button = el)} type="submit">
          <ClapSpinner size={20} loading={loading} />
          {!loading && "Login"}
        </button>
        <h3 ref={(el) => (text = el)}>
          Don't have an account? <Link to="/register">Register</Link>
        </h3>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
