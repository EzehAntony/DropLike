import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import "./Profile.css";
import userStore from "../User";
import Post from "../components/Post";
import Friend from "../components/Friend";

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

  const [value, setValue] = useState([]);

  const [profile, setProfile] = useState({
    user: null,
    posts: null,
    userFollowers: [],
    userFollowings: [],
  });

  const timeline = async () => {
    await axios({
      method: "GET",
      url: `https://droplikebackend.herokuapp.com/api/post/get/all/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        setPostLoading(false);
        setPostError(null);
        setProfile({ ...profile, posts: res.data });
        return res;
      })
      .catch((err) => {
        setPostLoading(false);
        setPostError(err);
      });
  };

  const fetchuserProfile = async () => {
    setLoading(true);
    axios({
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
        setProfile((prev) => ({ ...prev, user: res.data }));

        if (profile.user.followers.includes(user._id)) {
          setFollow("Unfollow");
        } else {
          setFollow("Follow");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const fetchFrieneds = async () => {
    const promise = Promise.all(
      profile.user.followers.map((e) => {
        axios({
          method: "POST",
          url: `https://droplikebackend.herokuapp.com/api/user/get/${id}`,
          withCredentials: true,
          data: {
            userId: e,
          },
        })
          .then((res) => {
            setProfile((prev) => ({
              ...profile,
              userFollowers: [...prev.userFollowers, res.data],
            }));
          })
          .catch((err) => {});
      })
    );
    return promise;
  };

  const followClick = async (e) => {
    e.preventDefault();
    if (follow === "Unfollow") {
      setFollowLoading(true);
      await axios({
        method: "put",
        url: `https://droplikebackend.herokuapp.com/api/user/unfollow/${user._id}`,
        withCredentials: true,
        data: {
          userId: `${id}`,
        },
      })
        .then((res) => {
          setFollowLoading(false);
          setFollow("Follow");
        })
        .catch((err) => {
          setFollowLoading(false);
        });
    } else {
      setFollowLoading(true);
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
          setFollow("Unfollow");
        })
        .catch((err) => {
          setFollowLoading(false);
        });
    }
  };

  //fetch all and return response at the same time

  const post = (e) => {
    e.preventDefault();
    setValue("posts");
  };

  const followers = (e) => {
    e.preventDefault();
    setValue("followers");
  };

  const followings = (e) => {
    e.preventDefault();
    setValue("followings");
  };

  useEffect(() => {
    fetchuserProfile();
  }, [id, follow]);

  useEffect(() => {
    timeline();
  }, []);

  useEffect(() => {
    if (profile.user !== null) {
      fetchFrieneds();
    }
  }, [profile.user]);
  return (
    <div className="profile">
      <header>
        <div className="profileRing">
          <div className="profileImg">
            <img src="/henessy.jpg" alt="" />
          </div>
        </div>
        <div className="profileName">
          {data && data.firstname} {data && data.lastname}
        </div>
        <div className="profileUsername">
          {followLoading && "Loading..."}
          {loading && "fetching..."}
        </div>

        <div className="profileNumbers">
          <div className="following">
            <p>
              {profile.user && profile.user.followings.length}
              {!profile.user && "..."}
            </p>
            <span>Followings</span>
          </div>
          <div className="followers">
            <p>
              {profile.user && profile.user.followers.length}

              {!profile.user && "..."}
            </p>
            <span>Followers</span>
          </div>
          <div className="posts">
            <p>
              {profile.posts && profile.posts.length} {!profile.posts && "..."}
            </p>
            <span>Posts</span>
          </div>
        </div>

        {user._id !== id && (
          <div className="buttonContainer">
            <button className="follow" onClick={followClick}>
              {data && follow} {!data && "Follow"}
            </button>
            <button className="message">Message</button>
            <img src="/add.svg" className="suggested" alt="" />
          </div>
        )}
      </header>
      <hr />

      <div className="links">
        <p className="posts" onClick={post}>
          Posts
        </p>
        <p className="posts" onClick={followers}>
          followers
        </p>
        <p className="posts" onClick={followings}>
          followings
        </p>
      </div>

      <div className="inner">
        {value === "posts" &&
          profile.posts.map((post) => <Post data={post} key={post._id} />)}

        {value === "followers" && (
          <div className="followersWrapper">
            {profile.userFollowers?.map((post) => (
              <Friend data={post} key={post._id} />
            ))}
          </div>
        )}
        {value === "followings" && (
          <div className="followersWrapper">
            {profile.userFollowings?.map((post) => (
              <Friend data={post} key={post._id} />
            ))}
          </div>
        )}
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Profile;
