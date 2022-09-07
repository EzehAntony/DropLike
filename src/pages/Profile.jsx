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
import { ClapSpinner } from "react-spinners-kit";

function Profile() {
  const { id } = useParams();

  //********************UseStates***************//
  const [follow, setFollow] = useState("Follow");
  const [followLoading, setFollowLoading] = useState(null);
  const user = userStore((state) => state.user[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState([]);
  const [profile, setProfile] = useState("");
  const [post, setPost] = useState(null);
  const [success, setSuccess] = useState(false);

  //************Fetch Functions************//
  const Fetchposts = async () => {
    setLoading(true);
    setError(false);
    await axios({
      method: "GET",
      url: `https://droplikebackend.herokuapp.com/api/post/get/all/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        setLoading(false);
        setError(false);

        setPost(res.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  const fetchUser = async () => {
    await axios({
      method: "POST",
      url: `https://droplikebackend.herokuapp.com/api/user/get/${user._id}`,
      withCredentials: true,
      data: {
        userId: id,
      },
    })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
          setSuccess(true);
        })
        .catch((err) => {
          setFollowLoading(false);
          setSuccess(false);
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
          setSuccess(true);
          setFollow("Unfollow");
        })
        .catch((err) => {
          setFollowLoading(false);
          setSuccess(false);
        });
    }
  };

  /*         if(res.data.followers.includes(user._id)) {
          setFollow("follow")
        } */
  //button clicks
  const posts = (e) => {
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
    fetchUser();
  }, [id, success]);
  useEffect(() => {
    Fetchposts();
  }, [id]);

  useEffect(() => {
    setValue("posts");
  }, []);

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
      y: -50,
    });
    TweenMax.from(profilePictureRef, 0.8, {
      opacity: 0,
      y: 50,
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
            {profile && profile.gender == "male" ? (
              <img src="/male.jpg" alt="" />
            ) : (
              <img src="/henessy.jpg" alt="" />
            )}
          </div>
        </div>
        <div className="profileName">
          {data && data.firstname} {data && data.lastname}
        </div>
        <div ref={(el) => (usernameRef = el)} className="profileUsername">
          {profile && `@${profile.username} `}
          {followLoading && "Loading..."}
          {loading && "fetching..."}
        </div>

        <div className="profileNumbers">
          <div ref={(el) => (followingsRef = el)} className="following">
            <p>
              {profile && profile.followings.length}
              {!profile && "..."}
            </p>
            <span>Followings</span>
          </div>
          <div ref={(el) => (followersRef = el)} className="followers">
            <p>
              {profile && profile.followers.length}

              {!profile && "..."}
            </p>
            <span>Followers</span>
          </div>
          <div ref={(el) => (postsRef = el)} className="posts">
            <p>
              {post && post.length} {!post && "..."}
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
        <p ref={(el) => (postButtonRef = el)} className="posts" onClick={posts}>
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
        <ClapSpinner loading={loading} />
        {error && <img className="errorImg" src="/404.svg" />}

        {value === "posts" &&
          post
            ?.reverse()
            .map((post, index) => <Post data={post} key={index} />)}

        {value === "followers" && (
          <div className="followersWrapper">
            {profile.followers?.map((post, index) => (
              <Friend data={post} key={index} />
            ))}
          </div>
        )}
        {value === "followings" && (
          <div className="followersWrapper">
            {profile.followings?.map((post, index) => (
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
  