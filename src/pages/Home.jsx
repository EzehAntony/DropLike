import React, { useState } from "react";
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
function Home() {
  document.title = "Homepage";
  const user = userStore((state) => state.user[0]);

  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [error, setError] = useState(null);
  const [textPost, setTextPost] = useState("");

  const { id } = useParams();

  const fetchData = async () => {
    axios({
      url: `https://droplikebackend.herokuapp.com/api/post/timeline/${id}`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        setTimeline(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchUser = async () => {
    await axios({
      method: "POST",
      url: `https://droplikebackend.herokuapp.com/api/user/get/${id}`,
      withCredentials: true,
      data: {
        userId: id,
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  };
  const fetchFriends = async () => {
    const promise = Promise.all(
      data.followings.map((e) => {
        axios({
          method: "POST",
          url: `https://droplikebackend.herokuapp.com/api/user/get/${id}`,
          withCredentials: true,
          data: {
            userId: e,
          },
        })
          .then((res) => {
            setUserFriends((prev) => [...prev, res.data]);
          })
          .catch((err) => {});
      })
    );
    return promise;
  };
  const textPostFunction = async (e) => {
    e.preventDefault();
    toast.loading("Posting...", {
      theme: "colored",
      type: "info",
      toastId: "post",
    });
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
        toast.update("post", {
          render: "Posted",
          theme: "colored",
          autoClose: 1000,
          isLoading: false,
          type: "success",
        });
      })
      .catch((err) => {
        toast.update("post", {
          render: "Failed to post",
          pauseOnFocusLoss: false,
          autoClose: 1000,
          isLoading: false,
          type: "warning",
          
        });
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (data !== null) {
      fetchFriends();
    }
  }, [data]);

  useEffect(() => {
    if (userFriends.length !== 0) {
      fetchData();
    }
  }, [userFriends]);

  return (
    <div className="home">
      <header>
        <div className="headerInner">
          <img src="/box.svg" className="logo" alt="" />
          <input
            type="text"
            onChange={(e) => setTextPost(e.target.value)}
            placeholder={`${user.username}, what's new?`}
          />
          <button onClick={textPostFunction} className="homePost">
            Post
          </button>
        </div>
      </header>


      <div className="split">
        <div className="home-main">
          {!userFriends && "Add friends to view posts"}
          {timeline &&
            timeline.map((post, index) => <Post data={post} key={index} />)}
          {loading && <Loading />}
          <Post/>
        </div>

        <div className="home-other">
          {userFriends &&
            userFriends.map((user, index) => (
              <Friends data={user} key={index} />
            ))}
        </div>
      </div>

      <Footer />
      <ToastContainer/>
    </div>
  );
}

export default Home;
