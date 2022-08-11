import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import "./Profile.css";
import userStore from "../User";
import Post from "../components/Post";

//toast lib for pop-ups
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import axios (lib to fetch data)
import axios from "axios";
import { useState } from "react";
import useFetch from "../useFetch";
import Loading from "../components/Loading";

function Profile() {
  //states
  const [postData, setPostData] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [follow, setFollow] = useState(null);
  const [followLoading, setFollowLoading] = useState(null);
  const user = userStore((state) => state.user[0]);
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostData();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchPostData = async () => {
    await axios({
      method: "GET",
      url: `https://droplikebackend.herokuapp.com/api/post/get/all/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        setPostLoading(false);
        setPostError(null);
        setPostData(res.data);
      })
      .catch((err) => {
        setPostLoading(false);
        setPostError(err);
      });
  };

  const fetchUserData = async () => {
    setLoading(true);
    await axios({
      method: "POST",
      url: `https://droplikebackend.herokuapp.com/api/user/get/${user._id}`,
      withCredentials: true,
      data: {
        userId: `${id}`,
      },
    })
      .then((res) => {
        setLoading(false);
        setError(null);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const followClick = async (e) => {
    setFollowLoading(true)
    e.preventDefault();
    await axios({
      method: "put",
      url: `https://droplikebackend.herokuapp.com/api/user/follow/${user._id}`,
      withCredentials: true,
      data: {
        userId: `${id}`,
      },
    })
      .then((res) => {
        setFollowLoading(false);
        setFollow("Followed")
        setData(res.data);
      })
      .catch((err) => {
        setFollowLoading(false);
      });
  };

  return (
    <div className="profile">
      <header>
        <div className="profileRing">
          <div className="profileImg"></div>
        </div>
        <div className="profileName">
          {data && data.firstname} {data && data.lastname}
        </div>
        <div className="profileUsername">
          {data && `@${data.username}`} {!data && "Error!"}
          {loading && "fetching..."}
        </div>

        <div className="profileNumbers">
          <div className="following">
            <p>
              {data && data.followings.length} {!data && "!"}
            </p>
            <span>Followings</span>
          </div>
          <div className="followers">
            <p>
              {data && data.followers.length} {!data && "!"}
            </p>
            <span>Followers</span>
          </div>
          <div className="posts">
            <p>
              {postData && postData.length} {!postData && "!"}
            </p>
            <span>Posts</span>
          </div>
        </div>

        <div className="buttonContainer">
          <button className="follow" onClick={followClick}>
            Follow
          </button>
          <button className="message">Message</button>
          <img src="/add.svg" className="suggested" alt="" />
        </div>
      </header>
      <hr />

      <div className="links">
        <p className="posts">Posts</p>
        <p className="posts">followers</p>
        <p className="posts">followings</p>
      </div>

      <div className="inner">
        {postData &&
          postData.map((post) => {
            <Post loading={postLoading} data={postData} key={postData._id} />;
          })}
        {postLoading && "<Loading />"}
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Profile;
