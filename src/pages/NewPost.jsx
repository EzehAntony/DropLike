import React from "react";
import "./NewPost.css";
import Footer from "../components/Footer";
import userStore from "../User";

function NewPost() {
  const user = userStore((state) => state.user[0]);
  return (
    <div className="newPost">
      <header>
        <div className="profilePicture">
          <img src="/henessy.jpg" alt="" />
        </div>

        <p className="username">{user.username}</p>
      </header>

      <textarea
        className="text"
        placeholder={`${user.username}, what do think?`}
        name=""
        draggable={false}
        
      ></textarea>

      <Footer />
    </div>
  );
}

export default NewPost;
