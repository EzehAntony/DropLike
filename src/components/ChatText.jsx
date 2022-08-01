import React from "react";
import "./ChatText.css";

function ChatText() {
  return (
    <div className="chatText">
      <div className="left">
      <img className="circle" src="/girl.jpg" alt="" />
      </div>

      <div className="right">
        <h3>Anthony Ezeh</h3>
        <p className="message">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  );
}

export default ChatText;
