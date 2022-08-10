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
  const user = userStore((state) => state.user[0]);
  const { id } = useParams();

  const { data, loading } = useFetch(
    `http://https://droplikebackend.herokuapp.com/api/user/get/${id}`
  );
  const { postData, postLoading } = useFetch(
    `https://droplikebackend.herokuapp.com/api/post/get/${id}`
  );

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
              {data && data.p} {!data && "!"}
            </p>
            <span>Posts</span>
          </div>
        </div>

        <div className="buttonContainer">
          <button className="follow">Follow</button>
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
