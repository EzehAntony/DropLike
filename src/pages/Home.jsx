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

function Home() {
  document.title = "Homepage";
  const user = userStore((state) => state.user[0]);
  const [usernames, setUsernames] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const fetchData = async () => {
    const fff = await Promise.all(
      axios({
        url: "https://droplikebackend.herokuapp.com/api/post/timeline/62f831602e8623c3c78b66a2",
        method: "GET",
        withCredentials: true,
      }).then(() => {
        return fff;
      })
    );
  };

  const fetchFrieneds = async () => {
    await axios({
      method: "POST",
      url: `https://droplikebackend.herokuapp.com/api/user/get/${id}`,
      withCredentials: true,
      data: {
        userId: id,
      },
    })
      .then((res) => {
        res.data.followers.map((e) => {
          Promise.all(
            axios({
              method: "POST",
              url: `https://droplikebackend.herokuapp.com/api/user/get/${id}`,
              withCredentials: true,
              data: {
                userId: id,
              },
            }).then((res) => {
              console.log(res.data)
            })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    fetchFrieneds();
  }, []);

  return (
    <div className="home">
      <header>
        <img src="/box.svg" className="logo" alt="" />
        <input type="text" placeholder={`${user.username}, what's new?`} />
        <button className="homePost">Post</button>
      </header>
      <div className="split">
        <div className="home-main">
          {!data && "Add friends to view posts"}
          {loading && <Loading />}
        </div>

        <div className="home-other"></div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
