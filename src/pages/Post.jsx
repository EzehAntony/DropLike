import React from "react";
import "./Post.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import userStore from "../User";
import { useEffect } from "react";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import { ClapSpinner } from "react-spinners-kit";

function Post() {
  //  UseState
  const [post, setPost] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [postLoading, setPostLoading] = useState("");
  const [postError, setPostError] = useState("");
  const [input, setinput] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [increment, setIncrement] = useState(0);

  // params

  const { id } = useParams();

  //userStore
  const user = userStore((state) => state.user);

  //***********Fetch Post***************//
  const fetchPost = async () => {
    setPostLoading(true);
    setPostError(false);
    axios({
      url: `https://droplikebackend.herokuapp.com/api/post/get/${id}`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        setPostLoading(false);
        setPostError(false);
        setPost(res.data);
      })
      .catch((err) => {
        setPostLoading(false);
        setPostError(true);
      });
  };

  //***********Fetch user***************//

  const fetchUser = async () => {
    await axios({
      method: "POST",
      url: `https://droplikebackend.herokuapp.com/api/user/get/${user._id}`,
      withCredentials: true,
      data: {
        userId: post.userId,
      },
    })
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const commentFunc = () => {
    setCommentLoading(true);
    setCommentError(false);
    axios({
      url: `https://droplikebackend.herokuapp.com/api/post/comment/${id}`,
      method: "PUT",
      withCredentials: true,
      data: {
        userId: user._id,
        comment: input,
      },
    })
      .then((res) => {
        setCommentLoading(false);
        setCommentError(false);
        setIncrement(increment + 1);
        setinput("");
      })
      .catch((err) => {
        setCommentLoading(false);
        setCommentError(true);
      });
  };
  //useEffect

  useEffect(() => {
    fetchPost();
  }, [increment]);

  useEffect(() => {
    if (post) {
      fetchUser();
    }
  }, [post]);

  return (
    <div className="postDetail">
      <div className="header">
        {userProfile?.gender === "m" && (
          <img className="userImage" src="/male.jpg" alt="" />
        )}
        {userProfile?.gender === "f" && (
          <img className="userImage" src="/henessy.jpg" alt="" />
        )}
        {!userProfile && <img className="userImage" src="/noImg.png" alt="" />}

        {userProfile && (
          <div className="username">
            <h3>{userProfile.username}</h3>
          </div>
        )}
      </div>

      <div className="content">
        <p>{post && post.caption}</p>
      </div>

      <div className="action">
        {post && (
          <p>
            <span>{post.likes.length} </span> Likes
          </p>
        )}
        {post && (
          <p>
            <span>{post && post.comments.length} </span> comments
          </p>
        )}
      </div>

      <div className="commentSection">
        <textarea
          value={input}
          onChange={(e) => {
            setinput(e.target.value);
          }}
          name="comment"
          maxLength={500}
          placeholder="Comment here"
        ></textarea>
        <button onClick={commentFunc}>
          <ClapSpinner size={20} frontColor={"#fff"} loading={commentLoading} />
          {!commentLoading && "Post"}
        </button>
        <h3>comments</h3>
        {post &&
          post.comments.map((p, index) => <Comments data={p} key={index} />)}
      </div>

      <Footer />
    </div>
  );
}

export default Post;
