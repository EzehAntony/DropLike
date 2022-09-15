import React from "react";
import "./Search.css";
import Footer from "../components/Footer";
import Friend from "../components/Friend";
import { useState } from "react";
import useFetch from "../useFetch";
import { useEffect } from "react";
import userStore from "../User";
import { Link } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");
  const user = userStore((state) => state.user);

  const { data, loading, error } = useFetch(
    `https://droplikebackend.herokuapp.com/api/user/all/${user._id}`
  );

  return (
    <div className="searchPage">
      <div className="searchContainer">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />

        <div className="searchResult">
          {error && <img className="errorImg" src="/404.svg" />}

          {data &&
            data
              .filter((e) => {
                if (search == "") {
                  return e;
                } else if (e.includes(search)) {
                  return e;
                }
              })
              .map((data) => (
                <Link to={`/profile/${data._id}`} key={data._id}>
                  <Friend data={data} style={{ width: "100%" }} />
                </Link>
              ))}
        </div>

        {!loading && !data && !error && <h3>No data</h3>}
        {loading && <h3>Loading...</h3>}
      </div>
      <Footer />
    </div>
  );
}

export default Search;
