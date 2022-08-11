import React from "react";
import Post from "../components/Post";
import "./Home.css";
import Footer from "../components/Footer";
import userStore from "../User";
import Friends from "../components/Friend";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

function Home() {
  document.title = "Homepage";
  const user = userStore((state) => state.user[0]);

  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://droplikebackend.herokuapp.com/api/post/timeline/${id}`
  );
  return (
    <div className="home">
      <header>
        <img src="/box.svg" className="logo" alt="" />
        <input type="text" placeholder={`${user.username}, what's new?`} />
        <button className="homePost">Post</button>
      </header>
      <div className="split">
        <div className="home-main">
          {data &&
            data.map(() => {
              <Post data={data} key={data._id} loading={loading} />;
            })}
          {!data && "Add friends to view posts"}
          {loading && <Loading />}
        </div>

        <div className="home-other">
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
