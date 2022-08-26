import React, { useState, useRef } from "react";
import Post from "../components/Post";
import "./Home.css";
import Footer from "../components/Footer";
import userStore from "../User";
import Friends from "../components/Friend";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect } from "react";
import { toast, Toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TweenMax } from "gsap";
import { ClapSpinner } from "react-spinners-kit";

function Home() {
  document.title = "Homepage";
  const user = userStore((state) => state.user[0]);

  //**************UseState*************//
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [timeline, setTimeline] = useState(null);
  const [error, setError] = useState(null);
  const [textPost, setTextPost] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [profile, setProfile] = useState(null);

  const { id } = useParams();

  //**************Fetch Functions*************//

  const fetchData = async () => {
    setLoading(true);
    axios({
      url: `https://droplikebackend.herokuapp.com/api/post/timeline/${id}`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        setLoading(false);
        setTimeline(res.data.reverse());
      })
      .catch((err) => {
        setLoading(false);
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
        console.log("done");
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

  //**************Fetch UseEffect*************//

  useEffect(() => {
    fetchData();
  }, [postSuccess]);

  useEffect(() => {
    fetchUser();
  }, [id]);

  //**************UseRef*************//
  let headerRef = useRef(null);

  //*************Gsap UseEffect**************//
  /*   useEffect(() => {
    TweenMax.from(headerRef, 0.8, {
      y: -20,
      opacity: 0,
    });
  }, []); */

  return (
    <div className="home">
      <header ref={(el) => (headerRef = el)}>
        <div className="headerInner">
          <img src="/box.svg" className="logo" alt="" />
          <input
            type="text"
            onChange={(e) => setTextPost(e.target.value)}
            placeholder={`${user.username}, what's new?`}
          />
          <button onClick={textPostFunction} className="homePost">
            {!postLoading && "Post"}
            <ClapSpinner size={15} loading={postLoading} />
          </button>
        </div>
      </header>

      <div className="split">
        <div className="homeMain">
          {!userFriends && "Add friends to view posts"}
          {timeline &&
            timeline.map((post, index) => <Post data={post} key={index} />)}
          {<ClapSpinner loading={loading} />}
        </div>

        <div className="right">
          <div className="followers">
            <h1>followers</h1>
            {profile &&
              profile.followers.map((e, index) => (
                <Friends data={e} key={index} />
              ))}
          </div>
          <div className="followings">
            <h1>followings</h1>
            {profile &&
              profile.followings.map((e, index) => (
                <Friends data={e} key={index} />
              ))}
            <button className="addFriends">add friends</button>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Home;
