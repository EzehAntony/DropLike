import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";
import Footer from "../components/Footer";
import userStore from "../User";
import { TweenMax } from "gsap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewPost() {
  const navigate = useNavigate();
  const user = userStore((state) => state.user[0]);

  const [textPost, setTextPost] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const textPostFunction = async (e) => {
    setPostLoading(true);
    e.preventDefault();
    await axios({
      url: "https://droplikebackend.herokuapp.com/api/post/create",
      method: "POST",
      withCredentials: true,
      data: {
        caption: textPost,
        userId: user._id,
      },
    })
      .then((res) => {
        setPostLoading(false);
        setPostSuccess(true);
        navigate(`/home/${user._id}`);
      })
      .catch((err) => {
        setPostLoading(false);
        toast.error("Unable to post", {
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        });
      });
  };

  //**************Use Ref******************//
  let header = useRef(null);
  let body = useRef(null);
  let profilePicture = useRef(null);
  let text = useRef(null);
  let button = useRef(null);

  //*************UseEffect*************//
  useEffect(() => {
    TweenMax.from(header, 0.8, {
      y: -20,
      opacity: 0,
    });

    TweenMax.from(profilePicture, 0.8, {
      x: 20,
      opacity: 0,
      delay: 0.2,
    });
    TweenMax.from(text, 0.8, {
      y: -20,
      opacity: 0,
      delay: 0.4,
    });
    TweenMax.from(body, 0.8, {
      y: 20,
      opacity: 0,
      delay: 0.6,
    });
    TweenMax.from(button, 0.8, {
      x: 20,
      opacity: 0,
      delay: 1,
    });
  }, []);

  return (
    <div className="newPost">
      <header ref={(el) => (header = el)}>
        <div ref={(el) => (profilePicture = el)} className="profilePicture">
          {user?.gender == "m" && <img src="/male.jpg" alt="" />}
          {user?.gender == "f" && <img src="/henessy.jpg" alt="" />}
          {!user && <img src="/noImg.png" alt="" />}
        </div>

        <p ref={(el) => (text = el)} className="username">
          New Post
        </p>
      </header>

      <textarea
        ref={(el) => (body = el)}
        className="text"
        placeholder={`${user.username}, what do think?`}
        name=""
        draggable={false}
      ></textarea>

      <button
        onClick={textPostFunction}
        ref={(el) => (button = el)}
        className="postButton"
      >
        Post
      </button>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default NewPost;
