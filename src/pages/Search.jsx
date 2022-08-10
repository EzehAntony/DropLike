import React from "react";
import "./Search.css";
import Footer from "../components/Footer";
import Friend from "../components/Friend";
import { useState } from "react";
import useFetch from "../useFetch";
import { useEffect } from "react";

function Search() {
  const [search, setSearch] = useState("");

  const { data, loading, error } = useFetch(
    "https://droplikebackend.herokuapp.com/api/user/all"
  );

  useEffect(() => {
    const newApple = [];
    const apples = ["apple", "stew", "yam", "reem"];
    const a = apples[Math.floor(Math.random() * 3)];

  }, []);
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
          data.filter((e) => {
            if (search == "") {
              return <Friend style={{ width: "60%" }} data={data} />;
            } else if (e.includes(search)) {
              return <Friend style={{ width: "60%" }} data={data} />;
            }
          })}
        {!data && "No data"}
      </div>
      <Footer />
    </div>
  );
}

export default Search;
