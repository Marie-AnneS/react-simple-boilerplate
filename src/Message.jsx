import React from "react";

const Message = (props) => {
  return (
      <div className="message">
        <span className="message-username">{props.username}</span>
        <span className="message-content">
          {props.content}
        </span>
      </div>      
  );
};

export default Message;
