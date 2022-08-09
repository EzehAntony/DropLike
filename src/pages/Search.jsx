import React from "react";
import "./Search.css";
import Footer from "../components/Footer";
import Friend from "../components/Friend";
import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");

  const words = ["you", "are", "my", "universe", "anthony", "ant",];
  words.filter((word) => {
    if (search === "") {
      return words;
    } else if (word.includes(search)) {
      return console.log(word);
    }
  });

  return (
    <div className="searchPage">
      <div className="searchContainer">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <Friend style={{ width: "60%" }} />
        <Friend style={{ width: "60%" }} />
        <Friend style={{ width: "60%" }} />
        <Friend style={{ width: "60%" }} />
        <Friend style={{ width: "60%" }} />
        <Friend style={{ width: "60%" }} />
      </div>
      <Footer />
    </div>
  );
}

export default Search;
