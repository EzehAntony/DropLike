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
  const user = userStore((state) => state.user[0]);

  const { data, loading, error } = useFetch(
    `https://droplikebackend.herokuapp.com/api/user/all/${user._id}`
  );
  console.log(data)


  return (
    <div className="searchPage">
      <div className="searchContainer">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
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
              <Link to={`/profile/${data._id}`}>
                <Friend  key={data._id} data={data}  style={{ width: "100%" }} />
              </Link>
            ))}
        {!data && "No data"}
      </div>
      <Footer />
    </div>
  );
}

export default Search;
