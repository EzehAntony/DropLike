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

  //**************UseRef*************//
  let headerRef = useRef(null);

  //*************Gsap UseEffect**************//
  useEffect(() => {
    TweenMax.from(headerRef, 0.8, {
      y: -20,
      opacity: 0,
    });
  }, []);

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
        <div className="home-main">
          {!userFriends && "Add friends to view posts"}
          {timeline &&
            timeline.map((post, index) => <Post data={post} key={index} />)}
          {<ClapSpinner loading={loading} />}
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Home;
