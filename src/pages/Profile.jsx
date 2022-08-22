import React, { useEffect, useRef, useState } from "react";
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
import { TweenMax, Power3 } from "gsap";

function Profile() {
  const { id } = useParams();

  //********************UseStates***************//
  const [postData, setPostData] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [follow, setFollow] = useState("Follow");
  const [followLoading, setFollowLoading] = useState(null);
  const user = userStore((state) => state.user[0]);
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

  //************Fetch Functions************//
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

  //button clicks
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

  //useEffect hooks with dependencies

  //Fetch the user's profile
  useEffect(() => {
    fetchuserProfile();
    timeline();
  }, [id, follow]);

  useEffect(() => {
    setValue("posts");
  }, []);

  useEffect(() => {
    if (profile.user !== null) {
      fetchFrieneds();
      if (profile.user.followers.includes(user._id)) {
        setFollow("Unfollow");
      } else {
        setFollow("Follow");
      }
    }
  }, [profile.user]);

  //*************UseRef*************//
  let headerRef = useRef(null);
  let profilePictureRef = useRef(null);
  let usernameRef = useRef(null);
  let followersRef = useRef(null);
  let followingsRef = useRef(null);
  let postsRef = useRef(null);
  let hrRef = useRef(null);
  let postButtonRef = useRef(null);
  let followersButtonRef = useRef(null);
  let followingsButtonRef = useRef(null);
  let content = useRef(null);

  //************UseEffect for Gsap************//
  useEffect(() => {
    TweenMax.from(headerRef, 0.8, {
      opacity: 0,
      y: -20,
    });
    TweenMax.from(profilePictureRef, 0.8, {
      opacity: 0,
      y: 20,
      delay: 0.2,
    });
    TweenMax.from(usernameRef, 0.8, {
      opacity: 0,
      y: -20,
      delay: 0.4,
    });
    TweenMax.from(followersRef, 0.8, {
      opacity: 0,
      y: 15,
      delay: 0.6,
    });
    TweenMax.from(followingsRef, 0.8, {
      opacity: 0,
      y: 15,
      delay: 0.7,
    });
    TweenMax.from(postsRef, 0.8, {
      opacity: 0,
      y: 15,
      delay: 0.8,
    });
    TweenMax.from(hrRef, 0.8, {
      opacity: 0,
      x: "-10%",
      delay: 0.9,
    });
    TweenMax.from(postButtonRef, 0.8, {
      opacity: 0,
      y: 10,
      delay: 1,
    });
    TweenMax.from(followersButtonRef, 0.8, {
      opacity: 0,
      y: 10,
      delay: 1.1,
    });
    TweenMax.from(followingsButtonRef, 0.8, {
      opacity: 0,
      y: 10,
      delay: 1.2,
    });
    TweenMax.from(content, 0.8, {
      opacity: 0,
      y: "20",
      delay: 1.4,
    });
  }, []);

  return (
    <div className="profile">
      <div className="header" ref={(el) => (headerRef = el)}>
        <div ref={(el) => (profilePictureRef = el)} className="profileRing">
          <div className="profileImg">
            <img src="/henessy.jpg" alt="" />
          </div>
        </div>
        <div className="profileName">
          {data && data.firstname} {data && data.lastname}
        </div>
        <div ref={(el) => (usernameRef = el)} className="profileUsername">
          {profile.user && `@${profile.user.username} `}
          {followLoading && "Loading..."}
          {loading && "fetching..."}
        </div>

        <div className="profileNumbers">
          <div ref={(el) => (followersRef = el)} className="following">
            <p>
              {profile.user && profile.user.followings.length}
              {!profile.user && "..."}
            </p>
            <span>Followings</span>
          </div>
          <div ref={(el) => (followingsRef = el)} className="followers">
            <p>
              {profile.user && profile.user.followers.length}

              {!profile.user && "..."}
            </p>
            <span>Followers</span>
          </div>
          <div ref={(el) => (postsRef = el)} className="posts">
            <p>
              {profile.posts && profile.posts.length} {!profile.posts && "..."}
            </p>
            <span>Posts</span>
          </div>
        </div>

        {user._id !== id && (
          <div className="buttonContainer">
            <button className="follow" onClick={followClick}>
              {data && follow} {!data && follow}
            </button>
            <button className="message">Message</button>
            <img src="/add.svg" className="suggested" alt="" />
          </div>
        )}
      </div>
      <hr ref={(el) => (hrRef = el)} />

      <div className="links">
        <p ref={(el) => (postButtonRef = el)} className="posts" onClick={post}>
          Posts
        </p>
        <p
          className="posts"
          ref={(el) => (followersButtonRef = el)}
          onClick={followers}
        >
          followers
        </p>
        <p
          className="posts"
          ref={(el) => (followingsButtonRef = el)}
          onClick={followings}
        >
          followings
        </p>
      </div>

      <div ref={(el) => (content = el)} className="inner">
        {value === "posts" &&
          profile.posts?.map((post, index) => <Post data={post} key={index} />)}

        {value === "followers" && (
          <div className="followersWrapper">
            {profile.userFollowers?.map((post, index) => (
              <Friend data={post} key={index} />
            ))}
          </div>
        )}
        {value === "followings" && (
          <div className="followersWrapper">
            {profile.userFollowings?.map((post, index) => (
              <Friend data={post} key={index} />
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
