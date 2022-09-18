import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import axios from "axios";
import userStore from "../User";
import { TweenMax, TimelineLite, Power3 } from "gsap";
import refreshStore from "../refresh";
import { ClapSpinner, DominoSpinner } from "react-spinners-kit";

function Post({ data, loading }) {
  const navigate = useNavigate();
  //*****************UserStore******************//
  const user = userStore((state) => state.user);
  const refresh = refreshStore((state) => state.changeRefreshValue);

  //*****************UseState*******************//
  const [userProfile, setUserProfile] = useState(null);
  const [likee, setLikee] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  //***********Fetch Function***************//
  const fetchUserDetail = async () => {
    await axios({
      method: "POST",
      url: `https://droplikebackend.herokuapp.com/api/user/get/${user._id}`,
      withCredentials: true,
      data: {
        userId: data?.userId,
      },
    }).then((res) => {
      setUserProfile(res.data);
    });
  };

  //************Like Function*****************//
  const likeFunc = async () => {
    if (likee == "liked") {
      setLikee("unliked");
      await axios({
        url: `https://droplikebackend.herokuapp.com/api/post/like/${data._id}`,
        method: "PUT",
        withCredentials: true,
        data: {
          userId: user._id,
        },
      }).catch((err) => {
        setLikee("liked");
      });
    } else {
      setLikee("liked");
      await axios({
        url: `https://droplikebackend.herokuapp.com/api/post/like/${data._id}`,
        method: "PUT",
        withCredentials: true,
        data: {
          userId: user._id,
        },
      })
        .then((res) => {})
        .catch((err) => {
          setLikee("liked");
        });
    }
  };

  const deleteFunc = async () => {
    setDeleteLoading(true);
    axios({
      url: `https://droplikebackend.herokuapp.com/api/post/delete/${data._id}`,
      method: "DELETE",
      withCredentials: true,
      data: {
        userId: user._id,
      },
    })
      .then((res) => {
        setDeleteLoading(false);
        refresh(data._id);
      })
      .catch((err) => {
        setDeleteLoading(false);
        console.log(err);
      });
  };

  const commentFunc = async () => {
    navigate(`/postDetail/${data._id} `);
  };

  //*****************UseEffect*******************//
  useEffect(() => {
    if (data?.likes.includes(user._id)) {
      setLikee("liked");
    } else {
    }
  }, []);

  useEffect(() => {
    if (data) {
      fetchUserDetail();
    } else {
    }
  }, [userProfile]);

  return (
    <div className="post">
      <div className="post-header">
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
            {loading && "fetching..."}
          </div>
        )}
      </div>
      <div className="mainSection">
        <div className="caption">
          {data && data.caption}
          {loading && "fetching..."}
        </div>

        <div className="action">
          {likee === "liked" ? (
            <img
              onClick={likeFunc}
              src="/liked.png"
              className="actionImg"
              alt=""
            />
          ) : (
            <img
              onClick={likeFunc}
              src="/notliked.png"
              className="actionImg"
              alt=""
            />
          )}
          <img
            src="/comment.png"
            onClick={commentFunc}
            className="actionImg"
            alt=""
          />
          {!deleteLoading && data?.userId == user._id && (
            <img
              src="/delete.png"
              onClick={deleteFunc}
              className="actionImg"
              alt=""
            />
          )}

          <ClapSpinner size={16} loading={deleteLoading} />
        </div>
      </div>
    </div>
  );
}

export default Post;
