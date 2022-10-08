//React Imports
import React, { useState, useContext, useEffect, useRef } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { TimelineLite, Power3 } from "gsap";

/*****************Snow flakes******************/
import Snowfall from "react-snowfall";

//Toast imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//axios
import axios from "axios";

//Spinner kit import
import { ClapSpinner } from "react-spinners-kit";

function Register() {
  document.title = "DropLike Register";

  //Input state
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    gender: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //Form Submit function
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(input);
      await axios({
        url: "https://droplikebackend.herokuapp.com/api/auth/register",
        method: "POST",
        withCredentials: true,
        data: {
          gender: input.gender,
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

  //***********UseRef*****************//

  let logo = useRef(null);
  let form = useRef(null);
  let button = useRef(null);
  let text = useRef(null);

  //************Gsap TImeline*************//
  const t1 = new TimelineLite({ duration: 0.8, ease: Power3.easeIn });

  //************UseEffect for Gsap*************//

  useEffect(() => {
    t1.from(logo, { y: -20, opacity: 0 }, 0.2)
      .from(form, { y: 20, opacity: 0 }, 0.4)
      .from(button, { opacity: 0, x: -20 }, 0.6)
      .from(text, { opacity: 0, y: 20 }, 0.8);
  }, []);

  return (
    <div className="register">
      <img ref={(el) => (logo = el)} src="/logo4.png" alt="" />

      <form ref={(el) => (form = el)} onSubmit={submit}>
        <input
          type="text"
          placeholder="firstname"
          maxLength={15}
          minLength={5}
          value={input.firstName}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              firstName: e.target.value.toLowerCase().trim(),
            }))
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
            setInput((prev) => ({
              ...prev,
              lastName: e.target.value.toLowerCase().trim(),
            }))
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
            setInput((prev) => ({
              ...prev,
              username: e.target.value.toLowerCase().trim(),
            }))
          }
          required={true}
        />

        <input
          type="password"
          autoSave="true"
          placeholder="password"
          value={input.password}
          minLength={5}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              password: e.target.value.toLowerCase().trim(),
            }))
          }
          maxLength={15}
          required={true}
        />
        <div className="gender">
          gender: <span>M</span>
          <input
            type="radio"
            name="gender"
            value="m"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, gender: e.target.value }))
            }
          />
          <span>F</span>
          <input
            type="radio"
            name="gender"
            required
            value="f"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, gender: e.target.value }))
            }
          />
        </div>

        <button type="submit" ref={(el) => (button = el)} onSubmit={submit}>
          {!loading && "Sign Up"}
          <ClapSpinner size={15} loading={loading} />
        </button>
        <h3 ref={(el) => (text = el)}>
          Already have an account? <Link to="/login">login</Link>
        </h3>
      </form>
      <Snowfall />
      <ToastContainer />
    </div>
  );
}

export default Register;
