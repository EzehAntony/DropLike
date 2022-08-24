import React, { useEffect, useRef } from "react";
import "./NewPost.css";
import Footer from "../components/Footer";
import userStore from "../User";
import { TweenMax } from "gsap";

function NewPost() {
  const user = userStore((state) => state.user[0]);

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
          <img src="/henessy.jpg" alt="" />
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

      <button ref={(el) => button = el} className="postButton">Post</button>

      <Footer />
    </div>
  );
}

export default NewPost;
