import React from "react";
import Status from "../components/Status";
import "./Chats.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Chats() {
  return (
    <div className="chats">
      <div className="header">
        <div className="left">
          <img src="/box.svg" className="logo" alt="" />
          <h1>Chats</h1>
        </div>
        <img src="/add.svg" className="add" alt="" />
        <div className="searchBar"></div>
      </div>
      <div className="searchCont">
        <div className="searchInner">
          <input
            className="search"
            type="search"
            placeholder="Search your friend"
            name=""
            id=""
          />
          <img src="/search.svg" className="searchImg" alt="" />
        </div>
      </div>

      <div className="main">
        <div className="mainInner">
          <Swiper
            spaceBetween={50}
            slidesPerView={4}

          >
            <SwiperSlide><Status /></SwiperSlide>
            <SwiperSlide><Status /></SwiperSlide>
            <SwiperSlide><Status /></SwiperSlide>
            <SwiperSlide><Status /></SwiperSlide>
            <SwiperSlide><Status /></SwiperSlide>
            <SwiperSlide><Status /></SwiperSlide>
            <SwiperSlide><Status /></SwiperSlide>
            <SwiperSlide><Status /></SwiperSlide>
            <SwiperSlide><Status /></SwiperSlide>
            ...
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Chats;
